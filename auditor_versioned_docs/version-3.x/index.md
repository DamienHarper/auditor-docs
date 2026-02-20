---
title: What is auditor?
---

The purpose of `auditor` is to provide an easy and standardized way to collect audit logs.


## Architecture

This library is architected around two concepts:

- Auditing services responsible for collecting audit events
- Storage services responsible for persisting audit traces

Those two kind of services are offered by Providers.


## Default provider

A default provider is included with this library: `DoctrineProvider`

`DoctrineProvider` offers both auditing services and storage services.
It creates audit logs for all `Doctrine ORM` database related changes:

- inserts and updates including their diffs and relation field diffs.
- many to many relation changes, association and dissociation actions.
- if available, the user responsible for these changes and his IP address are recorded. 
- audit entries are inserted within the same transaction during **flush** event 
so that even if something fails the global state remains clean.

`DoctrineProvider` supports following RDBMS

* MySQL
* MariaDB
* PostgreSQL
* SQLite

`DoctrineProvider` **should** work with **any other** database supported by `Doctrine`. 
Though, we can only really support the ones we can test with [GitHub Actions](https://github.com/features/actions).

Basically you can track any change of any entity from audit logs.

:::info Note
- DoctrineProvider does not support composite primary keys.
- DoctrineProvider does not allow tracking changes resulting from 
   direct DQL/SQL update or delete statements.
:::
