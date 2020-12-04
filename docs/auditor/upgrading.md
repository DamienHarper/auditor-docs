---
title: "Upgrading"
introduction: "How to upgrade to a newer version"
previous:
    text: Release notes
    url: /docs/auditor/release-notes.html
next:
    text: Providers
    url: /docs/auditor/providers.html
---

Jump to the [Upgrading from a previous version](/docs/auditor/upgrading.html#upgrading-from-a-previous-version) section 
if you're not upgrading from `DoctrineAuditBundle`


## Upgrading from `DoctrineAuditBundle`

`DoctrineAuditBundle` is now deprecated since it has been split into two separate packages 
* `auditor` the core library
* `auditor-bundle` a Symfony bundle providing `auditor` integration into Symfony applications

So, upgrading from `DoctrineAuditBundle` to `auditor` + `auditor-bundle` requires a few steps

### 1. Configuration file
Create a new configuration file `dh_auditor.yaml`
(full configuration reference available [here](/docs/auditor-bundle/configuration/reference.html))

Minimal config file:
```yaml
dh_auditor:
    enabled: true
    providers:
        doctrine:
            table_prefix: ~
            table_suffix: '_audit'
```

### 2. Add `auditor-bundle` as a dependency
Run the following command in a console
```bash
composer require damienharper/auditor-bundle ^4.0
```

### 3. Fix annotation namespace changes
Replace the `use` statement related to `Audit` annotation to reference the new namespace in your entities. 

```diff-php
- use DH\DoctrineAuditBundle\Annotation as Audit;
+ use DH\Auditor\Provider\Doctrine\Auditing\Annotation as Audit;
```

### 4. Fix route name changes
Reference the new routes in the `config/routes.yaml`
```diff-yaml
- dh_doctrine_audit:
-     resource: "@DHDoctrineAuditBundle/Controller/"
-     type: annotation
+ dh_auditor:
+     resource: "@DHAuditorBundle/Controller/"
+     type: annotation
```

Route names have been renamed, change them accordingly in your code. 
You'll find below a summary of route name changes.

 Before (`DoctrineAuditBundle` route name) | After (`auditor-bundle` route name)
:------------------------------------------|:-----------------------------------
 `dh_doctrine_audit_list_audits`           | `dh_auditor_list_audits` 
 `dh_doctrine_audit_show_transaction`      | `dh_auditor_show_transaction` 
 `dh_doctrine_audit_show_entity_history`   | `dh_auditor_show_entity_history` 

### 5. `AuditReader` deprecation
`AuditReader` has been replaced by `Reader` and `Query` objects, so if you used it to query 
the audit logs, dive into the [Querying audits section](/docs/auditor-bundle/usage/querying.html) 

### 6. Remove `DoctrineAuditBundle`
Run the following command in a console
```bash
composer remove damienharper/doctrine-audit-bundle
```

### 7. Ensure your schema is up to date
Check the [Upgrading from a previous version](/docs/auditor/upgrading.html#upgrading-from-a-previous-version) 
below to ensure your schema is up to date.

---

## Upgrading from a previous version

Once you upgraded the bundle to a newer version, you first have to 
be sure your current schema is up to date and upgrade it if necessary.

The following command does all of this for you:

```bash
# symfony < 3.4
app/console audit:schema:update --force
```

```bash
# symfony >= 3.4
bin/console audit:schema:update --force
```