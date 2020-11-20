---
title: "General configuration"
introduction: "A guide to configuring auditor-bundle."
previous:
    text: Upgrade Guide
    url: /docs/auditor-bundle/upgrading.html
next:
    text: Auditing configuration
    url: /docs/auditor-bundle/configuration/auditing.html
---

Depending on the Symfony version your application relies, configuration is located in the following file:

- In a Symfony >= 4.0 application: `config/packages/dh_auditor.yaml`
- In a Symfony <= 3.4 application: `app/config/config.yml`


## Timezone
<span class="tag mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-green-100 text-green-700">auditor</span>

You can configure the timezone the audit `created_at` is generated in. This by default is `UTC`.

```yaml
dh_auditor:
    timezone: 'Europe/London'
```

## Enabling/Disabling auditing (globally)
<span class="tag mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-green-100 text-green-700">auditor</span>

By default, `auditor-bundle` audits every entity [declared auditable](/docs/auditor-bundle/auditing-configuration#audited-entities-and-properties-doctrine-provider).

It is however possible to disable audits by default. In this case, **nothing is audited** 
until auditing is enabled [at runtime](24-enabling-disabling-audits.md#at-runtime-enabledisable).

```yaml
dh_auditor:
    enabled: false
```

You can also enable or disable the auditing of entities [per entity](/docs/auditor-bundle/configuration#enabling-disabling-auditing-per-entity-doctrine-provider) 
and at [runtime](/docs/auditor-bundle/enabling-disabling-at-runtime#enabling-disabling-at-runtime-doctrine-provider) if you use the built-in Doctrine provider.


## User provider
<span class="tag mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-green-100 text-green-700">auditor</span>

A user provider is a service which goal is to return information about current user.  
`auditor` then invokes the user provider any time it receives an audit event.

```yaml
dh_auditor:
    # Invokable service (callable) that provides user information
    user_provider: ~
```


## Security provider
<span class="tag mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-green-100 text-green-700">auditor</span>

A security provider is a service which goal is to return security information such as current client IP, etc.  
`auditor` then invokes the security provider any time it receives an audit event.

```yaml
dh_auditor:
    # Invokable service (callable) that provides security information (IP, firewall name, etc)
    security_provider: ~
```


## Role checker
<span class="tag mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-green-100 text-green-700">auditor</span>

A role checker is a service which goal is to return a `boolean` indicating whether permission to access 
an entity's audit logs is granted for the current user.  

```yaml
dh_auditor:
    # Invokable service (callable) that checks roles
    roles_checker: ~
```

<hr>


## Doctrine provider settings

### Enabling/Disabling auditing (per entity)
<span class="tag mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-blue-100 text-blue-700">doctrine-provider</span>

This lets you disable audit logging for an entity by default and only enable auditing 
when needed for example. Per entity enabling/disabling is done in the configuration file.

```yaml
dh_auditor:
    enabled: true                           # auditing is globally enabled
    providers:
        doctrine:
            entities:
                App\Entity\MyEntity1:
                    enabled: false          # auditing of this entity is disabled
                App\Entity\MyEntity2: ~     # auditing of this entity is enabled
```

In the above example, an audit table will be created for `MyAuditedEntity1`, 
but audit entries will only be saved when auditing is explicitly enabled [at runtime](/docs/auditor-bundle/enabling-disabling-at-runtime#enabling-disabling-at-runtime-doctrine-provider).


### Enabling/Disabling audit viewer
<span class="tag mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-blue-100 text-blue-700">doctrine-provider</span>

`auditor-bundle` provides an [audit viewer](/docs/auditor-bundle/viewer) letting you review the full history of any audited entity.
This viewer is enabled by default and can be accessed at `/audit`. 

It is however possible to disable the audit viewer.

```yaml
dh_auditor:
    providers:
        doctrine:
            viewer: false
```

Add the following routes to the routing configuration (`config/routes.yaml`) to enable the included audit viewer.

```yaml
dh_auditor:
    resource: "@DHAuditorBundle/Controller/"
    type: auditor
``` 


### Inheritance
<span class="tag mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-blue-100 text-blue-700">doctrine-provider</span>

This bundle supports all of Doctrine inheritance types:

 - [mapped superclass inheritance](https://www.doctrine-project.org/projects/doctrine-orm/en/2.6/reference/inheritance-mapping.html#mapped-superclasses)
 - [single table inheritance](https://www.doctrine-project.org/projects/doctrine-orm/en/2.6/reference/inheritance-mapping.html#single-table-inheritance)
 - [class table inheritance](https://www.doctrine-project.org/projects/doctrine-orm/en/2.6/reference/inheritance-mapping.html#class-table-inheritance)


**Note**: configuring the root table to be audited does not suffice to get all child tables audited in a 
**single table inheritance** context. You have to configure every child table that needs to be audited as well.
