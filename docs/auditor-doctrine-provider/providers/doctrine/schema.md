# Schema Management

> **Create and manage audit tables in your database**

This guide covers how to create and manage audit tables using the `SchemaManager` and the available console commands.

## 🔍 Overview

For each audited entity, the provider creates a corresponding audit table to store the change history. The `SchemaManager` class handles all schema operations using DBAL's schema introspection API.

The schema can be managed in two ways:

1. **Automatically** — via Doctrine's `postGenerateSchemaTable` event (integrates with `doctrine:schema:update` / Migrations)
2. **Manually** — by calling `SchemaManager::updateAuditSchema()` directly

### Two commands, two distinct roles

| Command | Role | When to run |
|---------|------|-------------|
| `audit:schema:update` | Creates audit tables for new entities, keeps existing v2 tables in sync | Regularly (after adding entities, after upgrades) |
| `audit:schema:migrate` | One-time data-safe migration from the legacy v1 schema to v2 | Once, when upgrading from a pre-v5 installation |

> [!IMPORTANT]
> `audit:schema:update` **refuses to run if any audit table still has the legacy v1 schema** (it would silently destroy `transaction_hash` and related data). Run `audit:schema:migrate` first, then `audit:schema:update`.

## 🏗️ Audit Table Structure (v2)

Each audit table created by v5+ has the following structure:

```sql
CREATE TABLE posts_audit (
    id               BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    schema_version   SMALLINT UNSIGNED NOT NULL DEFAULT 2,
    type             VARCHAR(11)  NOT NULL,
    object_id        VARCHAR(255) NOT NULL,
    discriminator    VARCHAR(255) NULL,
    transaction_id   CHAR(26)     NULL,
    diffs            JSON         NULL,
    extra_data       JSON         NULL,
    blame_id         VARCHAR(255) NULL,
    blame            JSON         NULL,
    created_at       DATETIME     NOT NULL,

    INDEX type_idx                   (type),
    INDEX object_id_idx              (object_id),
    INDEX discriminator_idx          (discriminator),
    INDEX transaction_id_idx         (transaction_id),
    INDEX blame_id_idx               (blame_id),
    INDEX created_at_idx             (created_at),
    INDEX object_id_type_idx         (object_id, type),
    INDEX blame_id_created_at_idx    (blame_id, created_at)
);
```

### Column Details

| Column            | Type             | Description                                                              |
|-------------------|------------------|--------------------------------------------------------------------------|
| `id`              | BIGINT (PK)      | Auto-increment primary key                                               |
| `schema_version`  | SMALLINT         | Row format version: `2` for v5+, `1` for legacy rows not yet converted   |
| `type`            | VARCHAR(11)      | Action: `insert`, `update`, `remove`, `associate`, `dissociate`          |
| `object_id`       | VARCHAR(255)     | The primary key of the audited entity                                    |
| `discriminator`   | VARCHAR(255)     | Entity class (used in inheritance hierarchies)                           |
| `transaction_id`  | CHAR(26)         | ULID that groups all changes from the same flush across tables           |
| `diffs`           | JSON             | Change data — see [Diffs format](#diffs-format) below                   |
| `extra_data`      | JSON             | Custom extra data (populated via `LifecycleEvent` listener)              |
| `blame_id`        | VARCHAR(255)     | User identifier who made the change                                      |
| `blame`           | JSON             | Blame context — see [Blame format](#blame-format) below                 |
| `created_at`      | DATETIME         | When the audit entry was created                                         |

### Diffs format

The `diffs` column stores a JSON object with a `source` descriptor and a `changes` map.

**insert / update:**
```json
{
    "source": { "id": "42", "class": "App\\Entity\\Post", "label": "My post", "table": "posts" },
    "changes": {
        "title": { "old": null, "new": "Hello" },
        "status": { "old": "draft", "new": "published" }
    }
}
```

**remove:**
```json
{
    "source": { "id": "42", "class": "App\\Entity\\Post", "label": "My post", "table": "posts" },
    "changes": {}
}
```

**associate / dissociate:**
```json
{
    "source":        { "id": "1", "class": "App\\Entity\\Post", "label": "My post", "table": "posts" },
    "target":        { "id": "5", "class": "App\\Entity\\Tag",  "label": "php",     "table": "tags"  },
    "is_owning_side": true,
    "join_table":    "post_tag"
}
```

### Blame format

The `blame` column consolidates what were four separate v1 columns into a single JSON object:

```json
{
    "username":      "alice",
    "user_fqdn":     "App\\Security\\User",
    "user_firewall": "main",
    "ip":            "127.0.0.1"
}
```

## 🛠️ Using SchemaManager

### Creating the Schema Manager

```php
<?php

use DH\Auditor\Provider\Doctrine\Persistence\Schema\SchemaManager;

$schemaManager = new SchemaManager($provider);
```

### Updating the Schema (Manual)

Creates audit tables for entities that don't have one yet, and adds missing columns to existing ones:

```php
// Create / update all audit tables
$schemaManager->updateAuditSchema();
```

> [!NOTE]
> `updateAuditSchema()` is safe to run repeatedly. It checks for existing tables and columns before making changes.

> [!CAUTION]
> `updateAuditSchema()` and `audit:schema:update` will refuse to run if any audit table still has the legacy v1 schema. Run `audit:schema:migrate` first.

### Console Commands

Three console commands are available.

---

#### `audit:schema:update`

Creates new audit tables (in v2 format) and keeps existing v2 tables in sync with the current schema definition. **Refuses to run if any v1 table is detected** — run `audit:schema:migrate` first.

```bash
# Preview the SQL that would be executed
php bin/console audit:schema:update --dump-sql

# Execute the changes
php bin/console audit:schema:update --force

# Both: show SQL and execute
php bin/console audit:schema:update --dump-sql --force
```

---

#### `audit:schema:migrate`

Migrates existing audit tables from the legacy v1 schema to v2. Designed for upgrading pre-v5 installations. Uses a three-phase approach to preserve data:

1. **Additive** — adds new v2 columns (`schema_version`, `transaction_id`, `blame`), migrates `blame_*` columns to the `blame` JSON column, marks rows as `schema_version=1`
2. **Conversions** *(optional)* — converts legacy data while source columns are still present
3. **Destructive** — drops legacy columns (`transaction_hash`, `blame_user`, `blame_user_fqdn`, `blame_user_firewall`, `ip`)

```bash
# Preview what would be executed
php bin/console audit:schema:migrate --dump-sql

# Migrate schema only (no data conversion — existing rows keep schema_version=1)
php bin/console audit:schema:migrate --force

# Also convert legacy diffs JSON to the new {source, changes} envelope
php bin/console audit:schema:migrate --force --convert-diffs

# Also convert legacy transaction_hash (SHA1) → transaction_id (ULID)
# Preserves transactional grouping across all audit tables
php bin/console audit:schema:migrate --force --convert-transaction-hash

# Both conversions at once (recommended)
php bin/console audit:schema:migrate --force --convert-all

# Process a sample to estimate migration time (does not drop legacy columns)
php bin/console audit:schema:migrate --force --convert-all --limit=1000
```

> [!TIP]
> **`--convert-diffs` and `--convert-transaction-hash` can be run independently in any order.** Run one first, then the other in a separate step — both are safe to run after the other has already completed.

> [!NOTE]
> When `--convert-diffs` is used without `--convert-transaction-hash`, the `transaction_hash` column is **preserved** so you can still run `--convert-transaction-hash` afterwards. It is only dropped when `--convert-transaction-hash` is used (or when neither conversion flag is given).

> [!WARNING]
> If you run `audit:schema:migrate --force` without any conversion flags, legacy `transaction_hash` and `blame_*` columns are dropped immediately without data conversion. Use `--convert-all` to preserve all data.

---

#### `audit:clean`

Removes audit entries older than a specified retention period (`P12M` by default).

```bash
# Keep last 6 months (dry run)
php bin/console audit:clean P6M --dry-run

# Execute, skip confirmation (for cron jobs)
php bin/console audit:clean P12M --no-confirm

# Delete before a specific date
php bin/console audit:clean --date=2024-01-01 --no-confirm

# Exclude specific entities
php bin/console audit:clean -x App\\Entity\\User

# Include only specific entities
php bin/console audit:clean -i App\\Entity\\Log
```

> [!NOTE]
> All commands use Symfony's Lock component to prevent concurrent execution.

---

#### Registering Commands (Standalone)

When not using auditor-bundle, register the commands manually:

```php
use DH\Auditor\Provider\Doctrine\Persistence\Command\CleanAuditLogsCommand;
use DH\Auditor\Provider\Doctrine\Persistence\Command\MigrateSchemaCommand;
use DH\Auditor\Provider\Doctrine\Persistence\Command\UpdateSchemaCommand;
use Symfony\Component\Console\Application;

$application = new Application();

$updateCommand = new UpdateSchemaCommand();
$updateCommand->setAuditor($auditor);
$application->add($updateCommand);

$migrateCommand = new MigrateSchemaCommand();
$migrateCommand->setAuditor($auditor);
$application->add($migrateCommand);

$cleanCommand = new CleanAuditLogsCommand();
$cleanCommand->setAuditor($auditor);
$application->add($cleanCommand);

$application->run();
```

### Programmatic Schema Update

```php
use DH\Auditor\Provider\Doctrine\Persistence\Schema\SchemaManager;

$schemaManager = new SchemaManager($provider);

// Get SQL without executing
$sqls = $schemaManager->getUpdateAuditSchemaSql();

// Execute all pending changes
$schemaManager->updateAuditSchema();

// Execute with a progress callback
$schemaManager->updateAuditSchema(null, function (array $progress) {
    echo sprintf('Updated: %s', $progress['table'] ?? '');
});
```

## 📛 Table Naming

### Default Naming

By default, audit tables are named: `{entity_table}_audit`

| Entity Table | Audit Table        |
|--------------|--------------------|
| `users`      | `users_audit`      |
| `posts`      | `posts_audit`      |
| `blog_posts` | `blog_posts_audit` |

### Custom Prefix/Suffix

```php
use DH\Auditor\Provider\Doctrine\Configuration;

// Prefix only: audit_posts
$config = new Configuration([
    'table_prefix' => 'audit_',
    'table_suffix' => '',
]);

// Suffix only: posts_history
$config = new Configuration([
    'table_prefix' => '',
    'table_suffix' => '_history',
]);

// Both: audit_posts_log
$config = new Configuration([
    'table_prefix' => 'audit_',
    'table_suffix' => '_log',
]);
```

## 🔄 Schema Changes

### Adding a New Audited Entity

When you add `#[Auditable]` to a new entity and add it to the configuration:

1. Call `$schemaManager->updateAuditSchema()` (or run `audit:schema:update --force`) to create the new audit table.

### Removing an Audited Entity

> [!NOTE]
> When you remove an entity from the auditing configuration, the audit table is **not** automatically deleted. Historical data is preserved. Drop the table manually if you no longer need it.

### Modifying Entity Fields

> [!TIP]
> Adding or removing fields from an entity requires **no schema changes** to the audit table. Diffs are stored as JSON, so new fields appear in future audits automatically and removed fields simply won't appear in new entries.

## 🗄️ Database-Specific Notes

### MySQL / MariaDB

- Native `JSON` column type is used for `diffs`, `extra_data`, and `blame`
- InnoDB engine is recommended for transactional integrity

### PostgreSQL

- Native `JSON` support
- Indexed columns use PostgreSQL-compatible index names

### SQLite

> [!NOTE]
> SQLite is recommended for development and testing only. It supports JSON operations natively from version 3.38+.

## ⚡ Performance Considerations

1. **Indexed columns** — All common query columns (`type`, `object_id`, `transaction_id`, `blame_id`, `created_at`) are indexed at creation time, plus composite indexes on `(object_id, type)` and `(blame_id, created_at)`
2. **JSON storage** — Native JSON types (MySQL, PostgreSQL) provide best query performance on `diffs`, `blame`, and `extra_data`
3. **Archiving** — Implement a periodic cleanup strategy for high-volume applications using `audit:clean`
4. **Separate database** — Consider storing audits in a dedicated database to avoid impacting application performance

---

## Next Steps

- 🔍 [Querying Audits](../../querying/index.md)
- 🗄️ [Multi-Database Setup](multi-database.md)
- 💡 [Extra Data](../../extra-data.md)
