---
title: "Enabling and disabling auditor at runtime"
introduction: "A guide to using auditor-bundle."
previous:
    text: Schema manipulation
    url: /docs/auditor-bundle/usage/schema-manipulation.html
next:
    text: Viewer
    url: /docs/auditor-bundle/usage/viewer.html
---

<div class="bg-orange-100 border-l-4 border-orange-500 text-oraneg-700 p-2 pl-4" role="alert">
  <p class="font-bold">Warning</p>
  <p>disabling audit logging for an entity will make its audit logs <b>incomplete/partial</b> 
     (no change applied to specified entity is logged in the relevant audit table while audit logging 
     is disabled for that entity).</p>
</div>


## Enabling/Disabling at runtime
<span class="tag mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-blue-100 text-blue-700">doctrine-provider</span>

You can disable audit logging at runtime by calling `DH\Auditor\Provider\Doctrine\Configuration::disableAuditFor(string $entity)`.  
This will prevent the system from logging changes applied to `$entity` objects.

You can then re-enable audit logging at runtime by calling `DH\Auditor\Provider\Doctrine\Configuration::enableAuditFor(string $entity)`.

To disable auditing for an entity, you first have to inject the `dh_auditor.provider.doctrine` 
service in your class, then use:

```php
$provider->getConfiguration()->disableAuditFor(MyEntity1::class);
```

To enable auditing afterwards, use:

```php
$provider->getConfiguration()->enableAuditFor(MyEntity1::class);
```
