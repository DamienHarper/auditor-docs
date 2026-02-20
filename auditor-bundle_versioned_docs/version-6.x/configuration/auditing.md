---
title: "Auditing configuration"
---

Audit configuration can be achieved using the YAML configuration file described in the [General](general.html) configuration section 
and/or using [attributes](auditing.html#attributes) (recommended).


## Auditing services
`doctrine-provider`

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
`doctrine-provider`

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
`doctrine-provider`

By default, `auditor-bundle` audits every property of entities [declared auditable](auditing.html#audited-entities-and-properties).
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
`doctrine-provider`

```yaml
dh_auditor:
    timezone: 'Europe/London'
    providers:
        doctrine:
            table_prefix: ''
            table_suffix: '_audit'
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

## Attributes
`doctrine-provider`

Several attributes are available and let you configure which entities are auditable, 
which properties should ignored and even the security requirements (roles) to view audits.


  Note
  Attribute take precedence over configuration coming from <code>dh_auditor.yaml</code> file.



### #Auditable
This attribute tells `auditor-bundle` to audit an entity. It has to be included in the entity class docblock.
```php
<?php
use DH\Auditor\Provider\Doctrine\Auditing\Annotation as Audit;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[Audit\Auditable]
class MyEntity
{
    //...
}
```
The above example makes `MyEntity` auditable, auditing is **enabled** by default.

You can pass an `enabled` (boolean) property to this attribute to instruct the bundle if auditing is
enabled or not by default for this entity. 
```php
<?php
use DH\Auditor\Provider\Doctrine\Auditing\Annotation as Audit;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[Audit\Auditable(enabled: false)]
class MyEntity
{
    //...
}
```
The above example makes `MyEntity` auditable, auditing is **disabled** by default.


### #Ignore
This attribute tells `auditor-bundle` to ignore a property (its changes won't be audited).
It has to be included in the property docblock.
```php
<?php
use DH\Auditor\Provider\Doctrine\Auditing\Annotation as Audit;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[Audit\Auditable]
class MyEntity
{
    public ?string $property1 = null;

    #[Audit\Ignore]
    public ?string $property2 = null;

    //...
}
```
The above example makes `MyEntity` auditable, auditing is **enabled** by default and `property2` 
**won't be** audited.

**Notice:** [globally ignored properties](auditing.html#ignoring-properties-globally) 
do not have to have an `#Ignore` attribute.


### #Security
This attribute rules the audit viewer and lets you specify which role(s) is(are) required to allow
the viewer to display audits of an entity. It has to be included in the entity class docblock.
```php
<?php
use DH\Auditor\Provider\Doctrine\Auditing\Annotation as Audit;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[Audit\Auditable]
#[Audit\Security(view: ['ROLE1', 'ROLE2'])]
class MyEntity
{
    public ?string $property1 = null;

    //...
}
```
The above example makes the audit viewer allow access (viewing) to `MyEntity` audits if 
the logged in user is granted either `ROLE1` or `ROLE2`.


### Example using attributes

Below is an example entity configured using attributes.

```php
<?php

namespace App\Entity;

use DH\Auditor\Provider\Doctrine\Auditing\Annotation as Audit;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[Audit\Auditable]
#[Audit\Security(view: ['ROLE1', 'ROLE2'])]
class AuditedEntity
{
    public ?string $property1 = null;

    #[Audit\Ignore]
    public ?string $property2 = null;

    //...
}
```
