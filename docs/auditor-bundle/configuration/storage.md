---
title: "Storage configuration"
introduction: "A guide to configuring auditor-bundle."
previous:
    text: Auditing configuration
    url: /docs/auditor-bundle/configuration/auditing.html
next:
    text: Configuration reference
    url: /docs/auditor-bundle/configuration/reference.html
---

Storage configuration is achieved using the YAML configuration file described in the [General](/docs/auditor-bundle/configuration) configuration section.


## Audit tables naming format
<span class="ml-3 mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-blue-100 text-blue-700">doctrine-provider</span>

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
<span class="ml-3 mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-blue-100 text-blue-700">doctrine-provider</span>

By default, `auditor-bundle` stores audits using Doctrine's default entity manager `doctrine.orm.default_entity_manager`.
However, `auditor-bundle` lets you store audits using several entity managers by adding them to the `storage_services` list.

<div class="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-2 pl-4" role="alert">
  <p class="font-bold">Note</p>
  <p>Using several entity managers for audit storage <b>requires</b> you to define a storage mapper (see below).</p>
</div>

```yaml
dh_auditor:
    providers:
        doctrine:
            # storage entity managers (storage services)
            storage_services:
                - '@doctrine.orm.default_entity_manager'
                - '@doctrine.orm.second_entity_manager'
                - '@doctrine.orm.third_entity_manager'
```

<div class="bg-orange-100 border-l-4 border-orange-500 text-oraneg-700 p-2 pl-4" role="alert">
  <p class="font-bold">Warning</p>
  <p>Using several entity managers for audit storage <b>breaks atomicity</b> provided by the bundle by default. 
     Audits persistence operations are performed into different transactions than entity persistence operations.</p>
     <p>This means that:</p>
     <ul class="list-disc">
        <li class="p-2 ml-10">
         if one of the current audited entity operation <b>fails</b>, audit data is <b>still persisted</b> 
         to the secondary database which is very bad (reference to entity data which doesn't exist 
         in the main database or reference to entity data in main database which doesn't reflect changes 
         logged in audit data)
        </li>
        <li class="p-2 ml-10">
         if one of the current audited entity operation <b>succeed</b>, audit data persistence in the 
         secondary database <b>still can fail</b> which is bad but can be acceptable in some use cases 
         (depending on how critical audit data is for your application/business, missing audit data 
         could be acceptable)
        </li>
     </ul>
</div>


## Storage mapper
<span class="ml-3 mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-blue-100 text-blue-700">doctrine-provider</span>

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
