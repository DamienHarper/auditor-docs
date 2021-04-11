---
title: "Release Notes"
introduction: "What's new in the latest version of auditor."
previous:
    text: Installation
    url: /docs/auditor/installation.html
next:
    text: Upgrade Guide
    url: /docs/auditor/upgrading.html
---

The format is inspired by [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## Version 1.x

### auditor v1.2.x
<div class="mt-3 italic text-gray-600">Not yet released</div>

#### Changes

* Properly handle (unsupported) composite primary keys: throw a dedicated exception when such an entity is audited.

---

### auditor v1.2.0
<div class="mt-3 italic text-gray-600">2021-03-04</div>

#### Fixes
* [#29 - reader->createQuery->addFilter by array of object_ids](https://github.com/DamienHarper/auditor/issues/29)
* [#243 (auditor-bundle) - How to store audit tables in other database ?](https://github.com/DamienHarper/auditor-bundle/issues/243)
* [#244 (auditor-bundle) - AuditReader->getAudits by array of ids](https://github.com/DamienHarper/auditor-bundle/issues/244)
* [#245 (auditor-bundle) - Doctrine Migrations not managing audit table](https://github.com/DamienHarper/auditor-bundle/issues/245)
* [#249 (auditor-bundle) - Doctrine migrations wants to drop tables](https://github.com/DamienHarper/auditor-bundle/issues/249)

#### Changes

* [#26 - Fixed multiple entity manager setups](https://github.com/DamienHarper/auditor/pull/26)
* [#30 - Annotations lazy loading](https://github.com/DamienHarper/auditor/pull/30)
* [#28 - Enhanced query filters](https://github.com/DamienHarper/auditor/pull/28)

```php
Query::addFilter(string $name, $value)
Query::addRangeFilter(string $name, $minValue, $maxValue)
Query::addDateRangeFilter(string $name, $minValue, $maxValue)
``` 
are now deprecated in favor of
```php
Query::addFilter(FilterInterface $filter)
``` 

There are several kinds of filters:
- `SimpleFilter` lets you filter by a specific value or set of values
- `RangeFilter` lets you filter by a range of values
- `DateRangeFilter` lets you filter by a range of dates

More details in the [documentation](https://damienharper.github.io/auditor-docs/docs/auditor-bundle/usage/querying.html#filters)


---

### auditor v1.1.0
<div class="mt-3 italic text-gray-600">2021-02-10</div>

#### Changes

* [#19 - Better handling of binary data](https://github.com/DamienHarper/auditor/pull/19)
* [#20 - UID support (Ramsey UUID/Symfony ULID)](https://github.com/DamienHarper/auditor/pull/20)
* [#21 - Fixed a Query bug using multiple filters](https://github.com/DamienHarper/auditor/pull/21)
* [#24 - Fixed a bug related to storage entity managers](https://github.com/DamienHarper/auditor/pull/24)

---

### auditor v1.0.1
<div class="mt-3 italic text-gray-600">2020-12-10</div>

#### Changes

* Updated CI to ensure proper Symfony versions are installed during tests (3.4, 4.4 and 5.x are tested)
* Fixed a failing test with Symfony 3.4

---

### auditor v1.0.0
<div class="mt-3 italic text-gray-600">2020-12-06</div>

Initial release.

The purpose of `auditor` is to provide an easy and standardized way to collect audit logs.

This library is architected around two concepts:

- Auditing services responsible for collecting audit events
- Storage services responsible for persisting audit traces

Those two kind of services are offered by Providers and a default one is included with this library: `DoctrineProvider`

`DoctrineProvider` offers both auditing services and storage services and 
creates audit logs for all `Doctrine ORM` database related changes.