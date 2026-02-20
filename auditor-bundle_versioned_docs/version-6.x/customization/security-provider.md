---
title: "Security provider setup"
---

A security provider is a service which goal is to return an `array` containing the current client IP 
and firewall name.  
`auditor` then invokes the security provider any time it receives an audit event.


## Built-in security provider
`auditor`

`auditor-bundle` provides a default built-in security provider based on Symfony's `RequestStack` and `FirewallMap`, 
but if you don't use those components, you can still provide a custom security provider. 


## Custom security provider
`auditor`

First you need to provide a service implementing the `SecurityProviderInterface` interface
and reference it in the `dh_auditor.yaml`. This service has to be a `callable` and 
returns security information as an `array` of client IP and firewall name.

### Example
```php
<?php

namespace App\Audit\Security;

use DH\Auditor\Security\SecurityProviderInterface;

class SecurityProvider implements SecurityProviderInterface
{
    public function __invoke(): array
    {
        // ... do your stuff here to get current client IP and firewall name
        // then return them in an `array` ...
    }
}
```

```yaml
# config/services.yaml
services:
  dh_auditor.security_provider: '@App\Audit\SecurityProvider'
```

And finally, reference it in the bundle's configuration file `dh_auditor.yaml`.

```yaml
# config/packages/dh_auditor.yaml
dh_auditor:
    # Invokable service (callable) that provides security information (IP, firewall name, etc)
    security_provider: 'dh_auditor.security_provider'
```
