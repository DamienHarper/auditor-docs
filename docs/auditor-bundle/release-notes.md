---
title: "Release Notes"
introduction: "What's new in the latest version of auditor-bundle."
previous:
    text: Installation
    url: /docs/auditor-bundle/installation.html
next:
    text: Upgrade Guide
    url: /docs/auditor-bundle/upgrading.html
---

The format is inspired by [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## Version 4.x

### auditor-bundle v4.1.0

#### Changes
<div class="mt-3 italic text-gray-600">2021-02-10</div>

* [#242 - Incompatible symfony/doctrine-bridge](https://github.com/DamienHarper/auditor-bundle/pull/242)

---

### auditor-bundle v4.0.4

#### Changes
<div class="mt-3 italic text-gray-600">2021-01-25</div>

* [#238 - Symfony 3.4 compatibility](https://github.com/DamienHarper/auditor-bundle/pull/238)
* [#239, #241- Add estonian (ET) translation](https://github.com/DamienHarper/auditor-bundle/pull/239)
* [#240 - Improved german translations](https://github.com/DamienHarper/auditor-bundle/pull/240)
* Fixed link tag

---

### auditor-bundle v4.0.3

#### Changes
<div class="mt-3 italic text-gray-600">2020-12-11</div>

* Updated CI to ensure proper Symfony versions are installed during tests (3.4, 4.4 and 5.x are tested)

---

### auditor-bundle v4.0.2

#### Changes
<div class="mt-3 italic text-gray-600">2020-12-08</div>

* Fixed a BC break with Symfony 4.3/4.4

---

### auditor-bundle v4.0.1

#### Changes
<div class="mt-3 italic text-gray-600">2020-12-07</div>

* [#224 - Changed `auditor` requirement from `dev-master` to `^1.0`](https://github.com/DamienHarper/auditor-bundle/pull/224)

---

### auditor-bundle v4.0
<div class="mt-3 italic text-gray-600">2020-12-06</div>

#### What's new

* `DoctrineAuditBundle` has been split into two different packages:
  * `auditor` the core library
  * `auditor-bundle` a Symfony bundle providing `auditor` integration into Symfony applications
* PHP 7.1 is not supported anymore.

#### Breaking changes
* Pretty much everything has been rewritten so public API and namespaces have changed.

#### How to upgrade?
You'll find a detailed upgrade guide [here](upgrading.html). 

---

## Version 3.x

### DoctrineAuditBundle v3.4.2
<div class="mt-3 italic text-gray-600">2020-11-26</div>

### Fixes
* [#200 - Template static datetime fix](https://github.com/DamienHarper/auditor-bundle/pull/200)
* [#221 - Remove the ROLE_PREVIOUS_ADMIN deprecation warning from Symfony 5.1](https://github.com/DamienHarper/auditor-bundle/pull/221)
* [#214 - Handle TableNotFoundException](https://github.com/DamienHarper/auditor-bundle/pull/214)
* [#204 - Migration postUp](https://github.com/DamienHarper/auditor-bundle/pull/204)

---

### DoctrineAuditBundle v3.4.1
<div class="mt-3 italic text-gray-600">2020-04-27</div>

### Changes
* Add operation type constants
* Audit operations were stored in reverse order in a transaction

---

### DoctrineAuditBundle v3.4.0
<div class="mt-3 italic text-gray-600">2020-03-29</div>

Starting today (2020-03-29), `4.x` development begins in `master` branch.
A `3.x` branch has also been created and will host any 3.x related development.

Note that `4.x` will drop PHP 7.1 support.

#### What's new
* Added support for reading audits by date range (thanks to @McAnix)
* Cleanup command accepts an ISO 8601 date interval (thanks to @patrickmatsumura)

#### Changes
* Added audited entity FQCN to event payload
* Avoid proxy references in audit entries

#### Fixes
* [#144 - Let the cleanup command accept an ISO 8601 duration](https://github.com/DamienHarper/DoctrineAuditBundle/issues/144)
* [#169 - why DH\DoctrineAuditBundle\User\UserInterface::getId() must return int|string|null?](https://github.com/DamienHarper/DoctrineAuditBundle/issues/169)
* [#171 - Add class name of the audited entity to the data array](https://github.com/DamienHarper/DoctrineAuditBundle/issues/171)
* [#177 - Delete operations save the proxy discriminator](https://github.com/DamienHarper/DoctrineAuditBundle/issues/177)

---

### DoctrineAuditBundle v3.3.3
<div class="mt-3 italic text-gray-600">2020-02-07</div>

#### Changes
* Fixed PHP 7.1 BC break

---

### DoctrineAuditBundle v3.3.2
<div class="mt-3 italic text-gray-600">2020-02-07</div>

#### Changes
* Fixed a BC break with Symfony 4.3/4.4

---

### DoctrineAuditBundle v3.3.1
<div class="mt-3 italic text-gray-600">2020-02-07</div>

#### Changes
* Fixed a deprecation warning with Symfony 4.3+
* Adjusted PHPStan rules
* Updated CHANGELOG.md

---

### DoctrineAuditBundle v3.3.0
<div class="mt-3 italic text-gray-600">2020-02-06</div>
#### What's new
* Add a configuration option for enabling/disabling audit viewer (thanks to @p365labs)
* Add french, english, spanish, italian and german translations (thanks to @p365labs)

#### Changes
* Fixed some Doctrine deprecations
* Fixed pager when viewing a entity history with lots of entries
* Fixed display of boolean values in the audit viewer
* PHPStan fixes (thanks to @patrickmatsumura, @DamienHarper)
* Documentation updates (thanks to @Jonathan-Lathiere, @DamienHarper)

---

### DoctrineAuditBundle v3.2.3
<div class="mt-3 italic text-gray-600">2019-12-05</div>

#### Changes
* Updated twig dependencies
* Fix a BC break introduced in `3.2.2` (#142)

---

### DoctrineAuditBundle v3.2.2
<div class="mt-3 italic text-gray-600">2019-12-03</div>

#### Changes
* Fixed pagination when the pager has a lot of pages
* Fixed documentation related to `@Security` annotation (thanks to @jean-gui) 

---

### DoctrineAuditBundle v3.2.1
<div class="mt-3 italic text-gray-600">2019-12-02</div>

#### Changes
* Restored `AuditReader::getAuditsCount()` which was removed by error in `3.2.0` 

---

### DoctrineAuditBundle v3.2.0
<div class="mt-3 italic text-gray-600">2019-12-02</div>

#### Changes
* Symfony 5 support
* PHP 7.4 support
* Fixed audit not capturing some entity mutation coming from other Doctrine linteners/subscribers (fixes #122)

---

### DoctrineAuditBundle v3.1.0
<div class="mt-3 italic text-gray-600">2019-11-21</div>

#### Changes
* Fixed Doctrine deprecations
* Ensure compatibility with doctrine/dbal <2.10.0
* Fixed table layout in the timeline (thanks to @Jonathan-Lathiere)
* Allow to filter audits using multiple filter values in `AuditReader::filterBy()`

---

### DoctrineAuditBundle v3.0.0
<div class="mt-3 italic text-gray-600">2019-11-01</div>
#### What's new
* **Annotation support**: audit configuration (audited entities, ignored columns, etc) can be done mostly 
using annotations in entities.
* **Audit events**: an audit event is dispatched for every audit entry opening the doors to add 
custom behavior on audit entry creation.
* **Security controls**: audit access can be now restricted to specific roles.
* The bundle now supports non numeric IDs for the `User` objects (thanks to @Gonzalo1987).
* A transaction hash is now stored in audit tables and makes it easier to identify all operations performed 
in the same transaction.
  - The timeline now displays a transaction hash for each element. By clicking a transaction hash, 
  you get a complete overview of all the operations included into the transaction.
  - `AuditReader::getAudits()` now accepts a transaction hash as fifth parameter to return audits 
  logged in the given transaction for the given entity.
  - `AuditReader::getAuditsByTransactionHash()` accepts a transaction hash as parameter and returns 
  all the audits logged in the given transaction.
* Better single table (`SINGLE_TABLE`) inheritance support.
  - `AuditReader::getAudits()` now accepts a boolean as sixth parameter to return either audits 
  for the given entity only or audits for the given entity hierarchy.
* Add class table (`JOINED`) inheritance support (thanks to @versh23).
* Performance enhancements when saving a lot of entities at once (thanks to @acanicatti).
* Removed deprecation messages (thanks to @maxhelias).
* Fixed an issue with `audit:schema:update` command when run against a database with no audit table.
* A few icons have been added in the timeline.
* Revamped documentation.

#### Breaking changes
* The structure of audit tables has changed so you have to run the migration command right after updating
* `AuditEntry::getUserId()` now return a `string` or `null` instead of an `int`.
* **When using a secondary database** Doctrine's `doctrine:schema:update` command do not create 
audit tables automatically anymore (this command cannot work with multiple databases simultaneously), 
use the bundled migration command instead which supports the same options as Doctrine's command.
  - `bin/console audit:schema:update --dump-sql` prints SQL queries that need be executed.
  - `bin/console audit:schema:update --force` executes relevant SQL queries.
* Configuration has changed to use a secondary database: you now only need to declare the dedicated 
entity manager in configuration file as described [here](https://github.com/DamienHarper/DoctrineAuditBundle/blob/master/doc/20-general-configuration.md#storage-configuration).
* The bundle requires `mbstring` extension (cf. https://www.php.net/manual/en/mbstring.installation.php).

#### How to upgrade?
Either update your `composer.json` file manually to include `"damienharper/doctrine-audit-bundle": "^3.0"` 
or run 
```bash
composer require damienharper/doctrine-audit-bundle ^3.0
```

Due to internal changes requiring new columns and `blame_id` column type change, run the migration command after updating the bundle to update the structure of your current audit tables.
```bash
bin/console audit:schema:update --force
```

---

## Version 2.x

### DoctrineAuditBundle v2.5.0
<div class="mt-3 italic text-gray-600">2019-09-04</div>

#### Changes
* Add an option to globally enable/disable auditing from configuration file (thanks to @MylesKingsnorth01)
* Allow to use a custom entity manager/secondary database for audits (thanks to @pawello92)
**Warning:** Using a custom entity manager/secondary database **breaks atomicity** because audited entity operation and audit storage are performed into different transactions.

---

### DoctrineAuditBundle v2.4.0
<div class="mt-3 italic text-gray-600">2019-08-19</div>

#### Changes
* Fix deprecated usage of `spaceless` tag (thanks to @maxhelias)
* Timezone can be set from configuration file. It affects audit entries creation date and defaults to UTC (thanks to @MylesKingsnorth01)

---

### DoctrineAuditBundle v2.3.2
<div class="mt-3 italic text-gray-600">2019-07-29</div>

#### Changes
* Add a new `AuditReader:getEntityTableAuditName()` method allowing to retrieve the audit table name for an entity (#68)

---

### DoctrineAuditBundle v2.3.1
<div class="mt-3 italic text-gray-600">2019-06-13</div>

#### Changes
* Fix `Unknown "spaceless" filter` encountered in some configurations (#65)
* Updated `README.md` regarding Symfony 3.4 configuration and `Unknown "pagerfanta" function` error (#64)

---

### DoctrineAuditBundle v2.3.0
<div class="mt-3 italic text-gray-600">2019-04-18</div>

#### Changes
* Add a way to globally enable and disable audit at runtime (#61 thanks to @webmasterMeyers)
* Fixed a Windows compatibility issue regarding URLs including backslashes (fixes #62)

---

### DoctrineAuditBundle v2.2.0
<div class="mt-3 italic text-gray-600">2019-04-15</div>

#### Changes
* Performance improvements in audit viewer
* Paginated timeline
* listAuditsAction() now also include disabled entities (fixes #58)

---

### DoctrineAuditBundle v2.1.0
<div class="mt-3 italic text-gray-600">2019-04-12</div>

#### Changes
* Reworked default templates to display audit entries in a timeline instead of a *simple* tabular view.
* Fixed some deprecated references
* `AuditReader::getAudits()` and `AuditController::showEntityHistoryAction()` do not return the first 50 history items anymore but the full history. Though, it is still possible to get only a few items by specifying `$pageSize` and `$page` arguments
* `README.md` adjustments

#### Breaking changes
* Some default templates have been renamed

---

### DoctrineAuditBundle v2.0.0
<div class="mt-3 italic text-gray-600">2019-03-25</div>

#### Changes
* Complete rewrite of many internal parts to improve testability and lessen complexity.
* Migration command allowing to change structure of concrete (currently used) audit tables.
* Tables with non numeric primary keys auditing support (closes #37)
* Firewall name and user object's Fully Qualified Domain Name are now stored in audit table (cf. #14)
* Improved unit tests
* New design of included audit viewer templates (now Bootstrap 4 based)
* [demo app](https://github.com/DamienHarper/doctrine-audit-bundle-demo) showing off included audit viewer templates

#### Breaking changes
* The structure of audit tables has changed so you have to run the migration command right after updating
* `AuditReader` and `AuditEntry` have been moved from `DH\DoctrineAuditBundle` namespace to `DH\DoctrineAuditBundle\Reader` namespace.
* `AuditEntry::getUserId()` and `AuditEntry::getUsername()` now return `null` (instead of `"Unknown"`) when user is undefined

#### How to upgrade?
Either update your `composer.json` file manually to include `"damienharper/doctrine-audit-bundle": "^2.0"` 
or run 
```bash
composer require damienharper/doctrine-audit-bundle ^2.0
```

Due to internal changes requiring new columns and `object_id` column type change, run the migration command after updating the bundle to update the structure of your current audit tables.
```bash
bin/console audit:schema:update
```

---

## Version 1.x

### DoctrineAuditBundle v1.6.0
<div class="mt-3 italic text-gray-600">2019-03-04</div>

#### Changes
* Unit tests and code coverage
* Travis CI integration
* Add support to Identity through foreign Entities (fixes #40)
* Better handling of Proxy objects (fixes #44)

#### Breaking changes
* `table` key in diffs (understand join table) is now present only when auditing associate/dissociate operations regarding ManyToMany relationships

---

### DoctrineAuditBundle v1.5.0
<div class="mt-3 italic text-gray-600">2019-02-06</div>

#### Changes
* Tracking of impersonator in `blame_user` column (@webmasterMeyers)
* Add aliases for `@dh_doctrine_audit.configuration` and `dh_doctrine_audit.reader` services (fixes #36)
* `README.md` adjustments

---

### DoctrineAuditBundle v1.4.0
<div class="mt-3 italic text-gray-600">2019-01-28</div>

#### Changes
* Schema support (fixes #32, thanks to @DrummerKH)
* Do not consider an entity as audited if its parent is (fixes #34)

---

### DoctrineAuditBundle v1.3.0
<div class="mt-3 italic text-gray-600">2019-01-21</div>

#### Changes
* Add a way to enable/disable auditing for an entity at runtime (@eduardoweiland)

---

### DoctrineAuditBundle v1.2.0
<div class="mt-3 italic text-gray-600">2018-12-13</div>

#### Changes
* Custom user provider support (thanks @eduardoweiland)
* Small `FAQ` update

---

### DoctrineAuditBundle v1.1.0
<div class="mt-3 italic text-gray-600">2018-12-05</div>

#### Changes
* Added a way to filter audit entries by type in the bundled controller (thanks @kl3sk)
* Added an `FAQ` section to the `README` (thanks @kl3sk)
* Removed unneeded dependency to `SensioFrameworkExtraBundle` (fixes #22)

#### Breaking changes
* Entries of type `AuditReader::DISSOCIATE` now refers to owning side ID in `object_id` field (fixes #4)
* Creation date of audit entries are now in `UTC` timezone 

---

### DoctrineAuditBundle v1.0.8
<div class="mt-3 italic text-gray-600">2018-07-19</div>

---
### DoctrineAuditBundle v1.0.7
<div class="mt-3 italic text-gray-600">2018-06-22</div>

---
### DoctrineAuditBundle v1.0.6
<div class="mt-3 italic text-gray-600">2018-05-04</div>

---
### DoctrineAuditBundle v1.0.5
<div class="mt-3 italic text-gray-600">2018-03-22</div>

---
### DoctrineAuditBundle v1.0.4
<div class="mt-3 italic text-gray-600">2018-03-17</div>

---
### DoctrineAuditBundle v1.0.3
<div class="mt-3 italic text-gray-600">2018-03-12</div>

---
### DoctrineAuditBundle v1.0.2
<div class="mt-3 italic text-gray-600">2018-03-08</div>

---
### DoctrineAuditBundle v1.0.1
<div class="mt-3 italic text-gray-600">2018-02-10</div>

---

### DoctrineAuditBundle v1.0.0
<div class="mt-3 italic text-gray-600">2018-02-08</div>

Initial release
