# auditor 4.0.0

> **The biggest release since 3.0**, auditor 4.0 is a full modernization of the library: it drops legacy compatibility layers, embraces PHP 8.4+, Symfony 8, and Doctrine 4/ORM 3 — and comes with meaningful new features and a **~25% performance improvement** on real-world flush workloads.

---

## ✨ What's new

### Extra data — attach any context to audit entries

Audit entries can now carry arbitrary supplementary data through a new nullable JSON `extra_data` column. Wire up a `LifecycleEvent` listener, inspect the audited entity, and populate whatever context matters to your application — the current HTTP request, the user's role at the time, a business workflow step, anything.

```php
// Attach extra context from a Symfony service
class AuditEnricher
{
    #[AsEventListener]
    public function onAudit(LifecycleEvent $event): void
    {
        $event->getPayload()['extra_data'] = [
            'ip'   => $this->requestStack->getCurrentRequest()?->getClientIp(),
            'role' => $this->security->getUser()?->getRoles(),
        ];
    }
}
```

After upgrading, run `audit:schema:update --force` to add the column. See the [Extra Data guide](docs/extra-data.md).

### JsonFilter — query your extra data

A new `JsonFilter` lets you query the `extra_data` column with a clean, expressive API. Nested JSON paths, all the standard operators, and native JSON indexing support for MySQL, MariaDB, PostgreSQL, and SQLite out of the box.

```php
// Find all audit entries where extra_data.role = "ROLE_ADMIN"
$filter = new JsonFilter('extra_data', 'role', '=', 'ROLE_ADMIN');
```

### NullFilter — audit query for NULL values

A dedicated `NullFilter` covers the `IS NULL` / `IS NOT NULL` case cleanly without workarounds.

### Extra data provider — global context for every audit entry

A new `extra_data_provider` callable on `Configuration` lets you attach context to **every** audit entry automatically, without wiring up a `LifecycleEvent` listener on each entity. Set it once and the return value is merged into `extra_data` for all audit entries produced during a flush.

```php
$configuration->setExtraDataProvider(function (): ?array {
    return [
        'ip'   => $this->requestStack->getCurrentRequest()?->getClientIp(),
        'role' => $this->security->getUser()?->getRoles(),
    ];
});
```

The provider runs before the `LifecycleEvent` listener, so per-entity listeners can override or extend the global context. See the [Extra Data guide](docs/extra-data.md) for the full precedence and merging rules.

### Query improvements

`resetQueryPart()` lets you reset individual parts of a query (`filters`, `orderBy`, `limit`) without rebuilding it from scratch — useful when reusing a base query for multiple result sets.

---

## ⚡ Performance — up to 25% faster on real flush workloads

Ten targeted micro-optimizations to the Doctrine flush pipeline reduce audit overhead significantly, with zero behavioral change. Measured with PHPBench (N=1000, PHP 8.5.3, xdebug off, in-memory SQLite):

| Workload | v3.4.0 | v4.0.0 | Gain |
|---|---|---|---|
| Insert (N entities) | 39.2ms | 29.6ms | **−25%** |
| Update (N entities, 3 fields) | 16.4ms | 12.3ms | **−25%** |
| Mixed (insert + update + remove) | 20.7ms | 16.2ms | **−22%** |
| Associate (ManyToMany) | 13.9ms | 13.0ms | −7% |
| Remove | 1.1ms | 1.2ms | ≈ 0 |

> **Note on `benchRemove` and `benchDissociate`:** these operations take ~1ms total, where audit overhead is smaller than measurement noise. They are not meaningfully impacted in either direction.

Key optimizations:
- `blame()` (user/security providers) called once per transaction, not once per entity
- `ClassMetadata` resolved once per entity operation and propagated — no repeated lookups
- Static cache for DBAL type name resolution (`array_search` over the full type map, now runs at most once per type per request)
- `getDatabasePlatform()` and `jsonTypes()` hoisted out of per-field loops
- Audit `INSERT` statements memoized per table — no re-preparation within a single flush
- `isAuditedField()` checks inlined — entity config resolved once per `diff()`, not per field
- `DateTimeZone` instance memoized for the transaction processor lifetime
- `array_reverse()` on UoW scheduled-entity arrays replaced with in-place reverse-index iteration

### `utf8_convert` is now opt-in

The implicit `mb_convert_encoding()` pass that ran on every audit entry has been removed from the default path. DBAL 4 enforces UTF-8 connections on PHP 8.4+ — the conversion was a no-op for virtually all modern applications.

If your application handles data from legacy non-UTF-8 sources, re-enable it explicitly:

```php
new Configuration(['utf8_convert' => true, /* ... */])
```

---

## 🐛 Bug fixes

### `@Id` ManyToOne association not audited (#249)

Entities that use a ManyToOne relationship as their primary key (`#[ORM\Id] #[ORM\ManyToOne]`) were not correctly audited: the identifier resolution failed on the composite key structure, causing the audit entry to be skipped or malformed. The ID extraction now handles ManyToOne primary keys correctly.

### PostgreSQL 16 — false-positive schema migrations (#241)

When using PostgreSQL 16 with a UTF-8 database, `doctrine:migrations:diff` was generating a new (empty) migration on every run because auditor was setting `charset`/`collation` as per-column platform options. PostgreSQL does not support per-column charset/collation, so Doctrine's comparator detected a difference on every introspection cycle. Column platform options are now only propagated on MySQL/MariaDB where they are meaningful.

### Quoted SQL identifiers in table names (#238)

Entities mapped to PostgreSQL reserved words (e.g. `#[ORM\Table(name: '"user"')]`) caused malformed SQL — `INSERT INTO "user"_audit` instead of `INSERT INTO "user_audit"` — because the audit suffix was appended outside the closing quote. Both the reader and the transaction processor now delegate to the pre-computed `computed_audit_table_name` stored in `Configuration`, which already handled quoting correctly since v3.x.

### Multi-database MySQL/MariaDB schemas (#236)

Applications that map entities across multiple MySQL/MariaDB databases using the `schema` attribute (e.g. `#[ORM\Table(schema: 'other_db')]`) experienced crashes: auditor was generating table names with a `__` separator (`other_db__user`) instead of dot notation (`other_db.user`). MySQL supports cross-database access via `database.table` natively, and Doctrine ORM handles it correctly without any metadata modification. The `__` separator and the metadata-rewriting behaviour of `TableSchemaListener` have been removed.

### ManyToMany associations on unidirectional relations (#234)

Association and dissociation changes on ManyToMany relations were silently ignored when only the owning-side entity carried `#[Auditable]`. The hydrator was requiring **both** entities to be audited before recording the event, but since the audit entry is written to the **owner's** audit table, only the owner needs to be audited. Unidirectional ManyToMany relations (and bidirectional ones where only the owner is auditable) now produce correct `associate`/`dissociate` entries.

### Decimal values — false-positive audit entries (#278)

Decimal columns storing numerically equal values in different string representations (e.g. `"60.00"` vs `"60"`) were incorrectly triggering audit entries on update. The diff computation was doing a raw string comparison, so `"60.00"` and `"60"` were treated as different values. Decimal strings are now normalised (trailing zeros and unnecessary decimal points stripped) before comparison, so only genuine numeric changes produce an audit entry.

### MySQL — false-positive ALTER TABLE on every audit:schema:update run (#276)

On MySQL without an explicit `defaultTableOptions` DBAL connection parameter, `audit:schema:update` was always emitting a no-op `ALTER TABLE … CHANGE column column …` statement for every STRING column, even when the audit table was already up-to-date. The root cause was that `processColumns()` unconditionally dropped and re-added STRING columns with `platformOptions: []`, while MySQL's introspector returns columns with explicit `charset`/`collation` in their platform options — the schema comparator therefore always detected a difference. The fix preserves the existing `platformOptions` when none are explicitly configured, keeping the desired schema identical to the introspected one.

### Multiple entity managers with disjoint namespace mappings (#281)

Applications using multiple Doctrine entity managers with namespace-restricted `MappingDriverChain` drivers (the standard Symfony configuration) crashed during flush: `Configuration::getEntities()` iterated all registered entities for every auditing EM, and called `getClassMetadata()` for entities whose namespace was not covered by that EM's driver chain. Doctrine's `MappingDriverChain` throws `MappingException: not found in the chain configured namespaces` in this case. The fix uses `isTransient()` — which returns `true` without throwing for unmanaged classes — as a lightweight guard before calling `getClassMetadata()`. Unlike an `getAllMetadata()`-based allowlist, `isTransient()` uses reflection for path-based `AttributeDriver` and namespace-prefix matching for `MappingDriverChain`, so it correctly handles both standard and Symfony-style multi-EM setups.

### SoftDeleteable — EntityNotFoundException when auditing a relation change (#285)

Changing a ManyToOne field whose previous value pointed to an entity hidden by a Doctrine SQL filter (e.g. Gedmo SoftDeleteable) threw `EntityNotFoundException` during flush. `AuditTrait::summarize()` calls `UoW::initializeObject()` to hydrate the related proxy before building the diff; when the entity row is inaccessible (filtered out), Doctrine throws. The fix wraps `initializeObject()` in a try/catch and falls back to a minimal summary built from `UoW::getEntityIdentifier()` — which reads directly from Doctrine's identity map without touching the proxy's properties — producing a `ClassName#ID` label instead of crashing.

### SoftDeleteable — duplicate REMOVE audit entries (#296)

Soft-deleting an entity could produce two `REMOVE` audit entries instead of one, depending on the order in which Gedmo's `SoftDeleteableListener` and auditor's `DoctrineSubscriber` were registered on the event manager. Both `TransactionHydrator::hydrateWithScheduledDeletions()` and `DoctrineSubscriber::postSoftDelete()` could each add the same entity to the transaction, resulting in a duplicate entry. `Transaction::remove()` now deduplicates entities before processing, ensuring exactly one `REMOVE` audit entry is produced regardless of listener registration order.

---

## 🔨 Breaking changes

### Updated requirements

| | v3.x | v4.0 |
|---|---|---|
| PHP | ≥ 8.2 | **≥ 8.4** |
| Symfony | ≥ 5.4 | **≥ 8.0** |
| Doctrine DBAL | ≥ 3.2 | **≥ 4.0** |
| Doctrine ORM | ≥ 2.13 | **≥ 3.2** |

### PHP 8.4+ modernization

The codebase has been rewritten to take full advantage of PHP 8.4, Symfony 8, and ORM 3. Each change has a straightforward mechanical replacement:

| What changed | Before (3.x) | After (4.0) |
|---|---|---|
| Transaction type constants | `Transaction::INSERT` | `TransactionType::INSERT` |
| Entry access | `$entry->getType()` | `$entry->type` |
| User access | `$user->getIdentifier()` | `$user->identifier` |
| Configuration | `$config->isEnabled()` | `$config->enabled` |
| Namespace | `...\Auditing\Annotation\*` | `...\Auditing\Attribute\*` |
| Loader class | `AnnotationLoader` | `AttributeLoader` |
| Event listeners | `EventSubscriberInterface` | `#[AsEventListener]` |
| Console commands | `setName()` / `setDescription()` | `#[AsCommand]` |
| Entity in LifecycleEvent | not available | `$event->entity` |

### Removed methods (DoctrineHelper)

Three long-deprecated static helpers have been removed in favour of native DBAL 4 equivalents:

| Removed | Replacement |
|---|---|
| `DoctrineHelper::createSchemaManager()` | `$connection->createSchemaManager()` |
| `DoctrineHelper::introspectSchema()` | `$schemaManager->introspectSchema()` |
| `DoctrineHelper::getMigrateToSql()` | See [upgrade guide](docs/upgrade/v4.md) |

### Schema update required

The new `extra_data` column must be added to existing audit tables:

```bash
# Preview the changes
bin/console audit:schema:update --dump-sql

# Apply them
bin/console audit:schema:update --force
```

---

## 🚀 Migrating from 3.x

A complete step-by-step upgrade guide is available in [docs/upgrade/v4.md](docs/upgrade/v4.md).

For most applications, the migration boils down to:

```bash
# 1. Update your dependencies
composer require \
    damienharper/auditor:^4.0 \
    symfony/framework-bundle:^8.0 \
    doctrine/dbal:^4.0 \
    doctrine/orm:^3.2

# 2. Apply the schema migration
bin/console audit:schema:update --force

# 3. Search-and-replace the renamed symbols (see table above)
# 4. Run your test suite
```

The breaking changes are mechanical — they are the natural outcome of dropping legacy compatibility shims and adopting modern PHP/Symfony/Doctrine idioms. **No audit data is affected; the on-disk format is fully preserved.**

---

## 🛠 Developer experience

- **Documentation moved in-repo** — all docs live in `docs/` and are versioned alongside the code.
- **PHPBench benchmark suite** — `composer bench`, `composer bench:baseline`, `composer bench:compare` for reproducible before/after comparisons.
- **Blackfire profiling** — `make profile` spins up the Blackfire agent as a Docker sidecar for flame-graph profiling.
- **Updated CI matrix** — PHP 8.4 and 8.5 × Symfony 8.0 × SQLite / MySQL / PostgreSQL / MariaDB.
- **PHPStan 2.x, Rector 2.x, PHPUnit 12.x** across the board.

---

## What's Changed

### Requirements & infrastructure
* Upgrade to PHP 8.4+, Symfony 8.0, Doctrine DBAL 4.x & ORM 3.x by @DamienHarper in #262
* Upgrade PHPStan 2.x, Rector 2.x, PHPUnit 12.x by @DamienHarper in #262
* Add CI workflow for 4.x matrix by @DamienHarper in #262
* DBAL 3.x dead code removal by @DamienHarper in #268

### Modernization (PHP 8.4+)
* Introduce `TransactionType` enum, replace `Transaction` string constants by @DamienHarper in #264
* PHP 8.4 property hooks on `Entry`, `User`, `Configuration` by @DamienHarper in #264
* Replace `EventSubscriberInterface` with `#[AsEventListener]` by @DamienHarper in #264
* Replace `setName()`/`setDescription()` with `#[AsCommand]` by @DamienHarper in #264
* Rename `Annotation` namespace → `Attribute`, `AnnotationLoader` → `AttributeLoader` by @DamienHarper in #264

### New features
* Extra data — `extra_data` JSON column and `LifecycleEvent::$entity` by @DamienHarper in #265
* `JsonFilter` for querying `extra_data` JSON paths by @DamienHarper in #266
* `NullFilter` for `IS NULL` / `IS NOT NULL` query conditions by @DamienHarper in #263 (via feat commit)
* `Query::resetQueryPart()` to selectively reset query parts by @DamienHarper in #267
* `extra_data_provider` callable on `Configuration` — attach global context to every audit entry without per-entity listeners by @DamienHarper in #298

### Performance
* 10 flush-pipeline micro-optimizations (~25% on insert/update/mixed) by @DamienHarper in #270
* `utf8_convert` made opt-in (default: `false`) by @DamienHarper in #270
* PHPBench benchmark suite + Blackfire profiling support by @DamienHarper in #271

### Bug fixes
* Fix auditing entities with a `@Id` ManyToOne association (#249) by @DamienHarper in #269
* Fix continuous schema migrations on PostgreSQL 16 caused by spurious `charset`/`collation` column platform options (#241) by @DamienHarper in #272
* Fix invalid audit table names for quoted SQL identifiers — PostgreSQL reserved words such as `"user"` now produce `"user_audit"` instead of `"user"_audit` (#238) by @DamienHarper in #273
* Fix broken table names when entities use a `schema` attribute on MySQL/MariaDB — the `__` separator has been replaced by the correct `.` dot notation, and `TableSchemaListener` no longer mangles Doctrine class metadata (#236) by @DamienHarper in #274
* Fix ManyToMany association/dissociation changes silently dropped when only the owning-side entity carries `#[Auditable]` — unidirectional relations now produce `associate`/`dissociate` audit entries (#234) by @DamienHarper in #275
* Fix false-positive ALTER TABLE on every `audit:schema:update` run on MySQL without `defaultTableOptions` — STRING column platformOptions (charset/collation) are now preserved during schema update (#276) by @DamienHarper in #277
* Fix false-positive audit entries for decimal columns when numerically equal values differ only in string representation (e.g. `"60.00"` vs `"60"`) — decimal strings are now normalised before comparison (#278) by @DamienHarper in #279
* Fix crash when using multiple entity managers with namespace-restricted `MappingDriverChain` drivers (Symfony-style multi-EM setup) — `getClassMetadata()` is now guarded by `isTransient()` to skip entities not managed by the current EM (#281) by @DamienHarper in #294
* Fix `EntityNotFoundException` when auditing a ManyToOne relation change whose previous value points to an entity hidden by a Doctrine filter (e.g. SoftDeleteable) — `initializeObject()` now falls back to a `ClassName#ID` summary instead of crashing (#285) by @DamienHarper in #295
* Fix duplicate `REMOVE` audit entries on soft-delete — `Transaction::remove()` now deduplicates entities to ensure exactly one entry regardless of listener registration order (#296) by @DamienHarper in #297

### Documentation
* Documentation moved in-repo (`docs/`) by @DamienHarper in #263
* Extra data guide with Mermaid diagrams by @DamienHarper in #265
* `JsonFilter` documentation and JSON indexing guides by @DamienHarper in #266
* Full v4 upgrade guide by @DamienHarper in #264

---

## References

- [Full upgrade guide (3.x → 4.0)](docs/upgrade/v4.md)
- [Official documentation](https://damienharper.github.io/auditor-docs/)
- [UPGRADE-4.0.md](UPGRADE-4.0.md)

**Full Changelog**: https://github.com/DamienHarper/auditor/compare/3.4.0...4.0.0
