---
title: "Installation"
---

This bundle should to be installed with [Composer](https://getcomposer.org)
The process vary slightly depending on if your application uses Symfony Flex or not.

Following instructions assume you to have Composer installed globally, as explained
in the [installation chapter](https://getcomposer.org/doc/00-intro.md)
of the Composer documentation.
  

## Requirements

| Version | Status                    | Requirements                   |
|:--------|:--------------------------|:-------------------------------|
| 5.x     | **Active development** 🚀 | **PHP &gt;= 7.4, Symfony &gt;= 4.4** |
| 4.x     | Active support            | PHP &gt;= 7.2, Symfony &gt;= 3.4     |
| 3.x     | End of life               | PHP &gt;= 7.1, Symfony &gt;= 3.4     |
| 2.x     | End of life               | PHP &gt;= 7.1, Symfony &gt;= 3.4     |
| 1.x     | End of life               | PHP &gt;= 7.1, Symfony &gt;= 3.4     |

## 1. Applications that use Symfony Flex

Open a command console, enter your project directory and execute:

```bash
composer require damienharper/auditor-bundle
```

## 2. Applications that don't use Symfony Flex

### 2.1 Download the Bundle

Open a command console, enter your project directory and execute the
following command to download the latest stable version of this bundle:

```bash
composer require damienharper/auditor-bundle
```

### 2.2 Enable the Bundle

Then, enable the bundle by adding it to the list of registered bundles
in the `app/AppKernel.php` file of your project:

```php
<?php
// app/AppKernel.php

// ...
class AppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = array(
            // ...
            new DH\AuditorBundle\DHAuditorBundle(),
        );

        // ...
    }

    // ...
}
```
