---
title: "User provider setup"
introduction: "A guide to configuring auditor-bundle."
previous:
    text: Configuration reference
    url: /docs/auditor-bundle/configuration/reference.html
next:
    text: Security provider
    url: /docs/auditor-bundle/customization/security-provider.html
---

A user provider is a service which goal is to return an object implementing `DH\Auditor\User\UserInterface`.  
`auditor` then invokes the user provider any time it receives an audit event.

## Built-in user provider
<span class="ml-3 mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-green-100 text-green-700">auditor</span>

`auditor-bundle` provides a default built-in user provider based on Symfony's `TokenStorage`, 
but if you don't use `TokenStorage`, you can still provide a custom user provider. 


## Custom user provider
<span class="ml-3 mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-green-100 text-green-700">auditor</span>

First you need to provide a service implementing the `UserProviderInterface` interface
and reference it in the `dh_auditor.yaml`. This service has to be a `callable` and 
returns user information as an object implementing `DH\Auditor\User\UserInterface`.

### Example
```php
<?php

namespace App\Audit\User;

use DH\Auditor\User\UserInterface;
use DH\Auditor\User\UserProviderInterface;

class UserProvider implements UserProviderInterface
{
    public function __invoke(): ?UserInterface
    {
        // ... do your stuff here to get current user
        // then return an object implementing `DH\Auditor\User\UserInterface` ...
    }
}
```

```yaml
# config/services.yaml
services:
  dh_auditor.user_provider: '@App\Audit\UserProvider'
```

And finally, reference it in the bundle's configuration file `dh_auditor.yaml`.

```yaml
# config/packages/dh_auditor.yaml
dh_auditor:
    # Invokable service (callable) that provides user information
    user_provider: 'dh_auditor.user_provider'
```
