---
title: "General configuration"
---

Depending on the Symfony version your application relies, configuration is located in the following file:

- In a Symfony &gt;= 4.0 application: `config/packages/dh_auditor.yaml`
- In a Symfony &lt;= 3.4 application: `app/config/config.yml`


## Timezone
`auditor`

You can configure the timezone the audit `created_at` is generated in. This by default is `UTC`.

```yaml
dh_auditor:
    timezone: 'Europe/London'
```

## Enabling/Disabling auditing (globally)
`auditor`

By default, `auditor-bundle` audits every entity [declared auditable](auditing.html#audited-entities-and-properties).

It is however possible to disable audits by default. In this case, **nothing is audited** 
until auditing is enabled [at runtime](../usage/enabling-disabling-at-runtime.html#at-runtime-enabledisable).

```yaml
dh_auditor:
    enabled: false
```

You can also enable or disable the auditing of entities per entity 
and at [runtime](../usage/enabling-disabling-at-runtime.html#at-runtime-enabledisable) if you use the built-in Doctrine provider.


## User provider
`auditor`

A user provider is a service which goal is to return information about current user.  
`auditor` then invokes the user provider any time it receives an audit event.

```yaml
dh_auditor:
    # Invokable service (callable) that provides user information
    user_provider: ~
```


## Security provider
`auditor`

A security provider is a service which goal is to return security information such as current client IP, etc.  
`auditor` then invokes the security provider any time it receives an audit event.

```yaml
dh_auditor:
    # Invokable service (callable) that provides security information (IP, firewall name, etc)
    security_provider: ~
```


## Role checker
`auditor`

A role checker is a service which goal is to return a `boolean` indicating whether permission to access 
an entity's audit logs is granted for the current user.  

```yaml
dh_auditor:
    # Invokable service (callable) that checks roles
    roles_checker: ~
```




## Doctrine provider settings

### Enabling/Disabling auditing (per entity)
`doctrine-provider`

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
but audit entries will only be saved when auditing is explicitly enabled [at runtime](../usage/enabling-disabling-at-runtime.html#at-runtime-enabledisable).


### Enabling/Disabling audit viewer
`doctrine-provider`

`auditor-bundle` provides an [audit viewer](../usage/viewer.html) letting you review the full history of any audited entity.
This viewer is disabled by default but can easily be enabled in the configuration file as shown below and can be accessed at `/audit`. 

```yaml
dh_auditor:
    providers:
        doctrine:
            viewer: true
```

If you're using flex, you are done, routes are automatically added to your application's
routing configuration (see `config/routes/dh_auditor.yaml`).  

Otherwise, you have to manually add the following routes to the routing configuration
of your application (`config/routes/dh_auditor.yaml`).

```yaml
dh_auditor:
    resource: "@DHAuditorBundle/Controller/"
    type: auditor
``` 


### Inheritance
`doctrine-provider`

This bundle supports all of Doctrine inheritance types:

 - [mapped superclass inheritance](https://www.doctrine-project.org/projects/doctrine-orm/en/2.6/reference/inheritance-mapping.html#mapped-superclasses)
 - [single table inheritance](https://www.doctrine-project.org/projects/doctrine-orm/en/2.6/reference/inheritance-mapping.html#single-table-inheritance)
 - [class table inheritance](https://www.doctrine-project.org/projects/doctrine-orm/en/2.6/reference/inheritance-mapping.html#class-table-inheritance)



  Note
  Configuring the root table to be audited does not suffice to get all child tables audited in a 
  single table inheritance context. You have to configure every child table that needs to be audited as well.

