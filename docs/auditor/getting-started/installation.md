# Installation

> **Install auditor using Composer**

This guide covers the installation of the auditor library using Composer.

## 📋 Requirements

### Version 4.x (Current)

| Requirement    | Version  |
|----------------|----------|
| PHP            | >= 8.4   |
| Symfony        | >= 8.0   |
| Doctrine DBAL  | >= 4.0   |
| Doctrine ORM   | >= 3.2   |

### Previous Versions

| Version | PHP     | Symfony   | Doctrine DBAL | Doctrine ORM |
|---------|---------|-----------|---------------|--------------|
| 3.x     | >= 8.2  | >= 5.4    | >= 3.2        | >= 2.13      |
| 2.x     | >= 7.4  | >= 4.4    | -             | -            |
| 1.x     | >= 7.2  | >= 3.4    | -             | -            |

## 📦 Install via Composer

`damienharper/auditor` is the core library. Providers are distributed as separate packages and must be installed alongside it.

### Core + Doctrine ORM provider

```bash
composer require damienharper/auditor damienharper/auditor-doctrine-provider
```

### Core + Eloquent ORM provider

```bash
composer require damienharper/auditor damienharper/auditor-eloquent-provider
```

### Core only (bring your own provider)

```bash
composer require damienharper/auditor
```

This will install the latest stable version compatible with your PHP and dependency requirements.

### Installing a Specific Version

To install a specific version:

```bash
# Install the latest 4.x version
composer require damienharper/auditor:^4.0 damienharper/auditor-doctrine-provider:^4.0

# Install the latest 3.x version
composer require damienharper/auditor:^3.0
```

## 🎵 Symfony Integration

For Symfony applications, we recommend using the **auditor-bundle** which provides:

- ✅ Automatic service configuration
- ✅ Web interface for browsing audits
- ✅ Console commands
- ✅ Twig extensions

```bash
composer require damienharper/auditor-bundle
```

> [!TIP]
> See the [auditor-bundle documentation](https://github.com/DamienHarper/auditor-bundle) for more details.

## 🔧 Standalone Usage

The library can be used without Symfony. You'll need to manually configure the Auditor and register providers.

See the [Quick Start Guide](quick-start.md) for a complete setup example.

## 📚 Dependencies

When using `damienharper/auditor-doctrine-provider`, the following dependencies are pulled in automatically:

| Package                      | Purpose                        |
|------------------------------|--------------------------------|
| `doctrine/dbal`              | Database abstraction layer     |
| `doctrine/orm`               | Object-Relational Mapping      |
| `symfony/event-dispatcher`   | Event handling                 |
| `symfony/options-resolver`   | Configuration handling         |
| `symfony/cache`              | Metadata caching               |
| `symfony/lock`               | Command locking                |

---

## Next Steps

- 🚀 [Quick Start Guide](quick-start.md) - Set up auditing in your project
- ⚙️ [Configuration](../configuration/index.md) - Configure auditor for your needs
- 🗄️ [DoctrineProvider](../providers/doctrine/index.md) - Learn about the Doctrine provider
