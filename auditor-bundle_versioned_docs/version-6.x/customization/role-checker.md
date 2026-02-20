---
title: "Role checker setup"
---

A role checker is a service which goal is to return a `boolean` indicating whether permission to access 
an entity's audit logs is granted for the current user.  

## Built-in role checker
`auditor`

`auditor-bundle` provides a default built-in role checker based on Symfony's `Security`, 
but if you don't use this component, you can still provide a custom role checker. 


## Custom role checker
`auditor`

First you need to provide a service implementing the `RoleCheckerInterface` interface
and reference it in the `dh_auditor.yaml`. This service has to be a `callable` and 
returns a `boolean`.

### Example
```php
<?php

namespace App\Audit\Security;

use DH\Auditor\Security\RoleCheckerInterface;

class RoleChecker implements RoleCheckerInterface
{
    public function __invoke(string $entity, string $scope): bool
    {
        // ... do your stuff here to check if access (scope) is granted
        // then return it as `bool` ...
    }
}
```
  
```yaml
# config/services.yaml
services:
  dh_auditor.role_checker: '@App\Audit\RoleChecker'
```

And finally, reference it in the bundle's configuration file `dh_auditor.yaml`.

```yaml
# config/packages/dh_auditor.yaml
dh_auditor:
    # Invokable service (callable) that checks roles
    role_checker: 'dh_auditor.role_checker'
```
