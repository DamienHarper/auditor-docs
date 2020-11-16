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

## Upgrading from DoctrineAuditBundle

...work in progress...

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
