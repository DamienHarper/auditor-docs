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

## auditor v1.0
<div class="mt-3 italic text-gray-600">2020-12-06</div>

Initial release.

The purpose of `auditor` is to provide an easy and standardized way to collect audit logs.

This library is architected around two concepts:

- Auditing services responsible for collecting audit events
- Storage services responsible for persisting audit traces

Those two kind of services are offered by Providers and a default one is included with this library: `DoctrineProvider`

`DoctrineProvider` offers both auditing services and storage services and 
creates audit logs for all `Doctrine ORM` database related changes.