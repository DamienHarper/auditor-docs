---
title: "Auditing configuration"
introduction: "A guide to configuring auditor-bundle."
previous:
    text: Configuration
    url: /docs/auditor-bundle/configuration/general.html
next:
    text: Storage configuration
    url: /docs/auditor-bundle/configuration/storage.html
---

Audit configuration can be achieved using the YAML configuration file described in the [General](/docs/auditor-bundle/configuration) configuration section 
and/or using [annotations](#configuration-using-annotations-doctrine-provider) (recommended).


## Auditing services
<span class="tag mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-blue-100 text-blue-700">doctrine-provider</span>

By default, `auditor-bundle` audits operations coming from Doctrine's default entity manager `doctrine.orm.default_entity_manager`.
Though, you can configure which entity managers are source of audit events by adding them to the `auditing_services` list.

```yaml
dh_auditor:
    providers:
        doctrine:
            # auditing entity managers (auditing services)
            auditing_services:
                - '@doctrine.orm.default_entity_manager'
                - '@doctrine.orm.second_entity_manager'
                - '@doctrine.orm.third_entity_manager'
```


## Audited entities and properties
<span class="tag mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-blue-100 text-blue-700">doctrine-provider</span>

By default, `auditor-bundle` won't audit any entity until you configure which ones have to be audited.

```yaml
dh_auditor:
    providers:
        doctrine:
            entities:
                App\Entity\MyEntity1: ~
                App\Entity\MyEntity2: ~
```

All `MyEntity1` and `MyEntity2` properties will be audited. 
Though it is possible to exclude some of them from the audit process.

```yaml
dh_auditor:
    providers:
        doctrine:
            entities:
                App\Entity\MyEntity1: ~   # all MyAuditedEntity1 properties are audited
                App\Entity\MyEntity2:
                    ignored_columns:      # properties ignored by the audit process
                        - createdAt
                        - updatedAt
```


## Ignoring properties globally
<span class="tag mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-blue-100 text-blue-700">doctrine-provider</span>

By default, `auditor-bundle` audits every property of entities [declared auditable](#audited-entities-and-properties-doctrine-provider).
But, you can define some properties to be always ignored by the audit process.

```yaml
dh_auditor:
    providers:
        doctrine:
            # columns ignored from auditing
            ignored_columns:
                - createdAt
                - updatedAt
```


## Example configuration
<span class="tag mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-blue-100 text-blue-700">doctrine-provider</span>

```yaml
dh_auditor:
    providers:
        doctrine:
            table_prefix: ''
            table_suffix: '_audit'
            timezone: 'Europe/London'
            ignored_columns:
                - createdAt
                - updatedAt
            entities:
                MyBundle\Entity\MyAuditedEntity1: ~
                MyBundle\Entity\MyAuditedEntity2:
                   ignored_columns:
                        - deletedAt
```

---

## Annotations
<span class="tag mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-blue-100 text-blue-700">doctrine-provider</span>

Several annotations are available and let you configure which entities are auditable, 
which properties should ignored and even the security requirements (roles) to view audits.

<div class="note note-info" role="alert">
  <p class="note-title">Note</p>
  <p class="note-desc">Annotation take precedence over configuration coming from <code>dh_auditor.yaml</code> file.</p>
</div>


### @Auditable
This annotation tells `auditor-bundle` to audit an entity. It has to be included in the entity class docblock.
```php
<?php

/**
 * @ORM\Entity
 *
 * @Audit\Auditable
 */
class MyEntity
{
    //...
}
```
The above example makes `MyEntity` auditable, auditing is **enabled** by default.

You can pass an `enabled` (boolean) property to this annotation to instruct the bundle if auditing is
enabled or not by default for this entity. 
```php
<?php

/**
 * @ORM\Entity
 *
 * @Audit\Auditable(enabled=false)
 */
class MyEntity
{
    //...
}
```
The above example makes `MyEntity` auditable, auditing is **disabled** by default.


### @Ignore
This annotation tells `auditor-bundle` to ignore a property (its changes won't be audited).
It has to be included in the property docblock.
```php
<?php

/**
 * @ORM\Entity
 *
 * @Audit\Auditable
 */
class MyEntity
{
    /**
     * @var string
     */
    public $property1;

    /**
     * @var string
     *
     * @Audit\Ignore
     */
    public $property2;

    //...
}
```
The above example makes `MyEntity` auditable, auditing is **enabled** by default and `property2` 
**won't be** audited.

**Notice:** [globally ignored properties](#ignoring-properties-globally-doctrine-provider) 
do not have to have an `@Ignore` annotation.


### @Security
This annotation rules the audit viewer and lets you specify which role(s) is(are) required to allow
the viewer to display audits of an entity. It has to be included in the entity class docblock.
```php
<?php

/**
 * @ORM\Entity
 *
 * @Audit\Auditable
 * @Audit\Security(view={"ROLE1", "ROLE2"})
 */
class MyEntity
{
    /**
     * @var string
     */
    public $property1;

    //...
}
```
The above example makes the audit viewer allow access (viewing) to `MyEntity` audits if 
the logged in user is granted either `ROLE1` or `ROLE2`.


### Example using annotations

Below is an example entity configured using annotations.

```php
<?php

namespace App\Entity;

use DH\AuditorBundle\Annotation as Audit;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 *
 * @Audit\Auditable
 * @Audit\Security(view={"ROLE1", "ROLE2"})
 */
class AuditedEntity
{
    /**
     * @var string
     */
    public $property1;

    /**
     * @var string
     *
     * @Audit\Ignore
     */
    public $property2;

    //...
}
```