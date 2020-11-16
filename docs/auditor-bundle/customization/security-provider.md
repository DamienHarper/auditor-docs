---
title: "Security provider setup"
introduction: "A guide to configuring auditor-bundle."
previous:
    text: User provider
    url: /docs/auditor-bundle/customization/user-provider.html
next:
    text: Role checker
    url: /docs/auditor-bundle/customization/role-checker.html
---

A security provider is a service which goal is to return an `array` containing the current client IP 
and firewall name.  
`auditor` then invokes the security provider any time it receives an audit event.


## Built-in security provider
<span class="ml-3 mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-green-100 text-green-700">auditor</span>

`auditor-bundle` provides a default built-in security provider based on Symfony's `RequestStack` and `FirewallMap`, 
but if you don't use those components, you can still provide a custom security provider. 


## Custom security provider
<span class="ml-3 mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-green-100 text-green-700">auditor</span>

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
