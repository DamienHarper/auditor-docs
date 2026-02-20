# auditor-bundle 7.0.0

> **The biggest release since the bundle's creation**, auditor-bundle 7.0 is a full modernization: it drops legacy compatibility layers, embraces PHP 8.4+, Symfony 8, and Doctrine 4/ORM 3 — and ships a completely redesigned audit viewer with a rich new feature set.

---

## ✨ What's new

### Completely redesigned audit viewer

The built-in viewer has been rebuilt from scratch. It replaces the Webpack/npm + Bootstrap stack with **AssetMapper and Tailwind CSS 4** — no Node.js toolchain required.

**New viewer capabilities:**

- **Dark / light mode** — toggle persisted in `localStorage`, follows system preference by default
- **Activity graph** — visual sparkline per entity on the home page showing audit activity over the last N days, configurable and cache-backed
- **Action type filter** — narrow the entity stream to `insert`, `update`, `remove`, `associate`, or `dissociate`
- **User filter** — filter by any user who ever made a change, with dedicated support for anonymous entries (`blame_id IS NULL`)
- **Extra data display** — each audit entry now shows its `extra_data` content when present, with per-key rendering, in all entry types (insert, update, associate, dissociate)
- **IP address and firewall** — displayed inline on each entry row when available
- **Cleaner entry layout** — operation badge, entity link, entity label, transaction hash, date, user, IP and firewall all arranged for quick scanning

### Activity graph

Each entity card on the home page shows a sparkline bar chart of audit volume over time.

```yaml
dh_auditor:
    providers:
        doctrine:
            viewer:
                activity_graph:
                    enabled: true
                    days: 30            # 1–30
                    layout: 'bottom'    # 'bottom' or 'inline'
                    cache:
                        enabled: true
                        pool: 'cache.app'
                        ttl: 300
```

Cache supports tag-based invalidation (`dh_auditor.activity`) when your pool implements `TagAwareCacheInterface`. A dedicated `audit:cache:clear` console command lets you flush it on demand.

### Extra data — integrated end-to-end

The new `extra_data` JSON column introduced in **auditor 4.0** is fully surfaced in the viewer. No template override needed: every audit entry automatically renders its extra data, decoded and formatted, in a clearly delimited section below the diff.

### `extra_data_provider` — global context without boilerplate

The bundle ships a ready-to-use `ExtraDataProvider` service that captures the **current route name** for every audit entry. Opt in with a single config line:

```yaml
dh_auditor:
    extra_data_provider: dh_auditor.extra_data_provider
```

This stores `{"route": "app_order_edit"}` in `extra_data` for every audit entry produced during an HTTP request. Outside HTTP context (e.g. console commands), `extra_data` remains `null`.

You can also plug in any custom service that returns `?array`:

```yaml
dh_auditor:
    extra_data_provider: App\Audit\MyExtraDataProvider
```

The provider runs **before** the `LifecycleEvent` is dispatched, so per-entity listeners can enrich or override the global context.

See [extra-data documentation](../customization/extra-data.md) for both approaches and their interaction.

---

## ⚡ Bundle modernization

### AbstractBundle migration

The bundle now extends `Symfony\Component\HttpKernel\Bundle\AbstractBundle`. The `Configuration` and `DHAuditorExtension` classes, along with four compiler passes, have been merged into `DHAuditorBundle::configure()` and `DHAuditorBundle::loadExtension()`. Services are registered programmatically — no `services.yaml`.

### PHP 8.4+ attributes throughout

| Class | Before | After |
|-------|--------|-------|
| `ConsoleEventSubscriber` | `EventSubscriberInterface` | `#[AsEventListener]` |
| `ViewerEventSubscriber` | `EventSubscriberInterface` | `#[AsEventListener]` |
| `ViewerController` | Manual route registration | `#[AsController]` + `#[Route]` |
| `TimeAgoExtension` | Extends `AbstractExtension` | `#[AsTwigFilter]` |
| `RoutingLoader` | Manual tag | `#[AutoconfigureTag('routing.loader')]` |
| `SecurityProvider` | Manual constructor injection | `#[Autowire]` |

### Final classes

All bundle classes are now `final`. Customisation is done through the three provider interfaces (unchanged) and Symfony's service decoration, not inheritance.

### AssetMapper + Tailwind CSS 4

The frontend toolchain switches from Webpack Encore / npm to Symfony AssetMapper. No `node_modules`, no build step. Assets are served directly from `public/bundles/dhauditor/`.

---

## 🔨 Breaking changes

### Updated requirements

| | 6.x | 7.0 |
|---|---|---|
| PHP | ≥ 8.2 | **≥ 8.4** |
| Symfony | ≥ 5.4 | **≥ 8.0** |
| Doctrine DBAL | ≥ 3.2 | **≥ 4.0** |
| Doctrine ORM | ≥ 2.13 | **≥ 3.2** |
| DoctrineBundle | ≥ 2.0 | **≥ 3.0** |
| damienharper/auditor | ≥ 3.0 | **≥ 4.0** |
| PHPUnit | ≥ 11.0 | **≥ 12.0** |

### Removed classes

| Removed class | Replacement |
|---|---|
| `DH\AuditorBundle\DependencyInjection\Configuration` | `DHAuditorBundle::configure()` |
| `DH\AuditorBundle\DependencyInjection\DHAuditorExtension` | `DHAuditorBundle::loadExtension()` |
| `DH\AuditorBundle\DependencyInjection\Compiler\AddProviderCompilerPass` | Autowiring |
| `DH\AuditorBundle\DependencyInjection\Compiler\CustomConfigurationCompilerPass` | `DHAuditorBundle::loadExtension()` |
| `DH\AuditorBundle\DependencyInjection\Compiler\DoctrineProviderConfigurationCompilerPass` | `DoctrineMiddlewareCompilerPass` |

### Route names

| Before (6.x) | After (7.0) |
|---|---|
| `dh_auditor_show_entity_history` | `dh_auditor_show_entity_stream` |
| `dh_auditor_show_transaction` | `dh_auditor_show_transaction_stream` |

Update any route references in your application.

### ConsoleUserProvider

CLI commands now use the **actual command name** as the user identifier instead of the generic `"command"` string.

| Before (6.x) | After (7.0) |
|---|---|
| `blame_id: "command"` | `blame_id: "app:import-users"` |
| `blame_user: "app:import-users"` | `blame_user: "app:import-users"` |

Existing audit entries with `blame_id = "command"` are not migrated automatically.

### Template blocks removed

| Removed block | Reason |
|---|---|
| `navbar` | Replaced by built-in header |
| `breadcrumbs` | No longer used |

Available blocks in 7.0: `title`, `stylesheets`, `dh_auditor_content`, `dh_auditor_header`, `dh_auditor_pager`, `javascripts`.

### Final classes

The following classes can no longer be extended:

```
DH\AuditorBundle\Event\ConsoleEventSubscriber
DH\AuditorBundle\Event\ViewerEventSubscriber
DH\AuditorBundle\Twig\TimeAgoExtension
DH\AuditorBundle\Routing\RoutingLoader
DH\AuditorBundle\User\UserProvider
DH\AuditorBundle\User\ConsoleUserProvider
DH\AuditorBundle\Security\SecurityProvider
DH\AuditorBundle\Security\RoleChecker
DH\AuditorBundle\Viewer\ActivityGraphProvider
```

Use composition and Symfony's service decoration instead.

### ActivityGraphProvider API

```php
// Before (6.x)
$provider->getDays();
$provider->getLayout();

// After (7.0) — PHP 8.4 property hooks
$provider->days;
$provider->layout;
```

### UserProvider

`AnonymousToken` handling has been removed (deprecated in Symfony 6.0, gone in Symfony 8.0).

### auditor library changes

This bundle requires **auditor ≥ 4.0**, which introduces its own breaking changes:

#### Namespace: Annotation → Attribute

```php
// Before
use DH\Auditor\Provider\Doctrine\Auditing\Annotation\Auditable;
use DH\Auditor\Provider\Doctrine\Auditing\Annotation\Ignore;

// After
use DH\Auditor\Provider\Doctrine\Auditing\Attribute\Auditable;
use DH\Auditor\Provider\Doctrine\Auditing\Attribute\Ignore;
```

#### Entry model — property hooks (PHP 8.4)

```php
// Before
$entry->getId();      $entry->getType();
$entry->getObjectId(); $entry->getUserId();
$entry->getUsername(); $entry->getCreatedAt();

// After
$entry->id;      $entry->type;
$entry->objectId; $entry->userId;
$entry->username; $entry->createdAt;
```

#### `utf8_convert` is now opt-in

The implicit `mb_convert_encoding()` pass is disabled by default. Re-enable it if your data sources are not guaranteed to be UTF-8:

```yaml
dh_auditor:
    providers:
        doctrine:
            utf8_convert: true
```

See the [auditor upgrade guide](https://github.com/DamienHarper/auditor/blob/master/UPGRADE-4.0.md) for the complete library changelog.

---

## 🚀 Migrating from 6.x

A complete step-by-step upgrade guide is available in [docs/upgrade/v7.md](../upgrade/v7.md).

For most applications, the migration boils down to:

```bash
# 1. Update dependencies
composer require \
    damienharper/auditor:^4.0 \
    damienharper/auditor-bundle:^7.0 \
    symfony/framework-bundle:^8.0 \
    doctrine/dbal:^4.0 \
    doctrine/orm:^3.2 \
    doctrine/doctrine-bundle:^3.0

# 2. Apply the schema migration (adds extra_data column)
bin/console audit:schema:update --force

# 3. Update namespace imports: Annotation → Attribute
# 4. Update route names in your templates and controllers
# 5. Run your test suite
```

The breaking changes are mechanical. **No audit data is affected.**

---

## 🛠 Developer experience

- **Documentation moved in-repo** — all docs live in `docs/` and are versioned alongside the code
- **Unified `composer setup`** — replaces the four legacy `setup5` / `setup6` / `setup7` / `setup8` scripts
- **PHPStan 2.x, Rector 2.x, PHPUnit 12.x** across the board
- **Updated CI matrix** — PHP 8.4 and 8.5 × Symfony 8.0 × SQLite / MySQL / PostgreSQL / MariaDB

---

## What's Changed

### Requirements & infrastructure
* Upgrade to PHP 8.4+, Symfony 8.0, Doctrine DBAL 4.x & ORM 3.x by @DamienHarper in #588
* Upgrade PHPStan 2.x, Rector 2.x, PHPUnit 12.x by @DamienHarper in #592
* Migrate from Webpack/npm to AssetMapper with Tailwind CSS 4 by @DamienHarper in #589

### Modernization (PHP 8.4+ / Symfony 8+)
* Migrate to `AbstractBundle`, merge `Configuration` + `DHAuditorExtension` into bundle class by @DamienHarper in #592
* Replace `EventSubscriberInterface` with `#[AsEventListener]` by @DamienHarper in #592
* Add `#[AsController]`, `#[AsTwigFilter]`, `#[AutoconfigureTag]`, `#[Autowire]` attributes by @DamienHarper in #592
* Mark all bundle classes as `final` by @DamienHarper in #592
* Remove `AnonymousToken` handling (removed in Symfony 8.0) by @DamienHarper in #592
* `ActivityGraphProvider` property hooks (`days`, `layout`) by @DamienHarper in #592

### New viewer features
* Completely redesigned audit viewer (AssetMapper + Tailwind CSS 4) by @DamienHarper in #589, #591
* Activity graph with sparklines, caching, and configurable layout by @DamienHarper in #591
* Action type filter and user filter on entity stream by @DamienHarper in #591
* Anonymous user filter via `NullFilter` (`blame_id IS NULL`) by @DamienHarper in #591
* Display `extra_data`, IP, and firewall in audit entries by @DamienHarper in #596
* Dark / light mode toggle by @DamienHarper in #591

### New features (auditor 4.0 integration)
* Extra Data — display `extra_data` JSON column in viewer by @DamienHarper in #596
* `extra_data_provider` config option — built-in `ExtraDataProvider` service (route name) and support for any custom callable; complements the existing `LifecycleEvent` listener approach by @DamienHarper in #594
* `NullFilter` integration for anonymous user filtering by @DamienHarper in #591
* `utf8_convert` configuration option documented (opt-in, default `false`) by @DamienHarper

### Bug fixes
* Fix `time_ago` filter falling back to a hardcoded US-style `Y/m/d g:i:sa` format for dates older than one week and future dates — both fallback paths now use `IntlDateFormatter` and respect the application locale (#359)

### Documentation
* Documentation moved in-repo (`docs/`) by @DamienHarper in #590
* Extra Data integration guide by @DamienHarper in #595
* Full v7 upgrade guide by @DamienHarper in #592
* GitHub Flavored Markdown improvements across all docs by @DamienHarper in #593

---

## References

- [Full upgrade guide (6.x → 7.0)](../upgrade/v7.md)
- [UPGRADE-7.0.md](../../UPGRADE-7.0.md)
- [auditor 4.0.0 release notes](https://github.com/DamienHarper/auditor/releases/tag/4.0.0)

**Full Changelog**: https://github.com/DamienHarper/auditor-bundle/compare/6.x...7.0.0
