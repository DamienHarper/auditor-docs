---
title: "Storage configuration"
---

Storage configuration is achieved using the YAML configuration file described in the [General](general.html) configuration section.


## Audit tables naming format
`doctrine-provider`

Audit table names are composed of a prefix, a name and a suffix. 
By default, the prefix is empty and the suffix is `_audit`. Though, they can be customized.

```yaml
dh_auditor:
    providers:
        doctrine:
            table_prefix: ~
            table_suffix: '_audit'
```


## Storage services
`doctrine-provider`

By default, `auditor-bundle` stores audits using Doctrine's default entity manager `doctrine.orm.default_entity_manager`.
However, `auditor-bundle` lets you store audits using several entity managers by adding them to the `storage_services` list.

:::info Note
- if one of the current audited entity operation fails, audit data is still persisted 
      to the secondary database which is very bad (reference to entity data which doesn't exist 
      in the main database or reference to entity data in main database which doesn't reflect changes 
      logged in audit data)
- if one of the current audited entity operation succeed, audit data persistence in the 
      secondary database still can fail which is bad but can be acceptable in some use cases 
      (depending on how critical audit data is for your application/business, missing audit data 
      could be acceptable)
:::


## Storage mapper
`doctrine-provider`

A storage mapper is a `callable` that routes audit events to storage services. 
It's up to the storage mapper to choose which storage service should be used to persist audits logs for a given entity.

A storage mapper expects 2 parameters as arguments and returns an object implementing `StorageServiceInterface`

- an entity FQCN (`string`)
- the list of registered storage services indexed by name (`array`)

### Example

Below is an example of a storage mapper `MyStorageMapper` routing audit logs from `MyEntity1` and `MyEntity2` 
to a particular storage service, all other audit logs are persisted by another storage service.

```php
<?php
namespace App;

use App\Entity\MyEntity1; 
use App\Entity\MyEntity2; 
use App\Entity\MyEntity3; 
use DH\Auditor\Provider\Service\StorageServiceInterface;

/**
 * MyStorageMapper is an invokable service
 */
class MyStorageMapper
{
    // the service expects 2 parameters and should return an object 
    // implementing StorageServiceInterface
    public function __invoke(string $entity, array $storageServices): StorageServiceInterface {
        return \in_array($entity, [MyEntity1::class, MyEntity2::class], true) ? $storageServices['db1'] : $storageServices['db2'];
    }
}
```

```yaml
# config/packages/dh_auditor.yaml
dh_auditor:
    providers:
        doctrine:
            # Invokable service that maps audit events to storage services
            storage_mapper: my_storage_mapper.map_storage
```
