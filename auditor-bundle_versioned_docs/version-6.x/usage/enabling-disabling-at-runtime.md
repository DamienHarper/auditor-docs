---
title: "Enabling and disabling auditor at runtime"
---


  Warning
  Disabling audit logging for an entity will make its audit logs incomplete/partial 
  (no change applied to specified entity is logged in the relevant audit table while audit logging 
  is disabled for that entity).


## Enabling/Disabling at runtime
`doctrine-provider`

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
