---
title: "Contributing"
introduction: "How to contribute?"
previous:
    text: Upgrade Guide
    url: /docs/auditor-bundle/upgrading.html
next:
    text: Configuration
    url: /docs/auditor-bundle/configuration/general.html
---

Contribution are always welcome and much appreciated!

The development of `auditor-bundle` is hosted on [GitHub](https://github.com/DamienHarper/auditor-bundle).

## Requirements
Before starting to contribute, you first need to install dev dependencies:

```bash
composer install --dev
```

You also have to install external dev tools:

```bash
composer reinstall damienharper/auditor --prefer-install=source
composer install --working-dir=tools/php-cs-fixer
composer install --working-dir=tools/phpstan
```

Also, in an effort to maintain an homogeneous code base, we strongly encourage contributors
to run [PHP-CS-Fixer](https://github.com/FriendsOfPHP/PHP-CS-Fixer) and [PHPStan](https://github.com/phpstan/phpstan)
before submitting a Pull Request.


## Coding standards
Coding standards are enforced using [PHP-CS-Fixer](https://github.com/FriendsOfPHP/PHP-CS-Fixer)

```bash
composer csfixer
```


## Static code analysis
Static code analysis can be achieved using [PHPStan](https://github.com/phpstan/phpstan)

```bash
composer phpstan
```


## Building assets
As the audit viewer relies on [Tailwind CSS](https://tailwindcss.com), you need to rebuild the assets as soon as 
you reference new classes in templates before release.

Building assets for release (production mode -- assets are minified).
```bash
yarn encore production
```

Building assets for development (development mode -- assets are **NOT** minified).
```bash
yarn encore dev
```


## Running Tests
The test suite is configured to use an SQLite in-memory database and generates
a code coverage report in `tests/coverage` folder.


### Default configuration (SQLite)
This configuration uses an in memory SQLite database and generates code coverage report
in `tests/coverage` folder (requires [PCOV extension](https://github.com/krakjoe/pcov)).

```bash
composer test
```
