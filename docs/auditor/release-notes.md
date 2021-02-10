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

### auditor v1.1.0

#### Changes
<div class="mt-3 italic text-gray-600">2021-02-10</div>

* [#19 - Better handling of binary data](https://github.com/DamienHarper/auditor/pull/19)
* [#20 - UID support (Ramsey UUID/Symfony ULID)](https://github.com/DamienHarper/auditor/pull/20)
* [#21 - Fixed a Query bug using multiple filters](https://github.com/DamienHarper/auditor/pull/21)
* [#24 - Fixed a bug related to storage entity managers](https://github.com/DamienHarper/auditor/pull/24)

---

### auditor v1.0.1

#### Changes
<div class="mt-3 italic text-gray-600">2020-12-10</div>

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