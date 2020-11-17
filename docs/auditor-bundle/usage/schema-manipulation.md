---
title: "Schema"
introduction: "A guide to using auditor-bundle."
previous:
    text: Role checker
    url: /docs/auditor-bundle/customization/role-checker.html
next:
    text: Runtime Enabling/Disabling
    url: /docs/auditor-bundle/usage/enabling-disabling-at-runtime.html
---

## Creating audit tables
<span class="tag ml-3 mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-blue-100 text-blue-700">doctrine-provider</span>

The process of audit table creation differs depending on your current setup:

- **single** storage service setup: audit tables are stored in the **same** database than audited ones (most common use case)
- **multiple** storage services setup: audit tables are stored in a **multiple** databases


### Single storage service setup (most common use case)

Open a command console, enter your project directory and execute the
following command to review the new audit tables in the update schema queue.

```bash
# symfony < 3.4
app/console doctrine:schema:update --dump-sql 
```

```bash
# symfony >= 3.4
bin/console doctrine:schema:update --dump-sql 
```

#### Using DoctrineMigrationsBundle

see [DoctrineMigrationsBundle](http://symfony.com/doc/current/bundles/DoctrineMigrationsBundle/index.html)

```bash
# symfony < 3.4
app/console doctrine:migrations:diff
app/console doctrine:migrations:migrate
```

```bash
# symfony >= 3.4
bin/console doctrine:migrations:diff
bin/console doctrine:migrations:migrate
```

#### Using Doctrine Schema

```bash
# symfony < 3.4
app/console doctrine:schema:update --force
```

```bash
# symfony >= 3.4
bin/console doctrine:schema:update --force
```


### Multiple storage services setup

Doctrine `Schema-Tool` and `DoctrineMigrationsBundle` are not able to work with more than one
database at once. To workaround that limitation, this bundle offers a migration command that 
focuses on audit schema manipulation.

Open a command console, enter your project directory and execute the following command to 
review the new audit tables in the update schema queue.

```bash
# symfony < 3.4
app/console audit:schema:update --dump-sql 
```

```bash
# symfony >= 3.4
bin/console audit:schema:update --dump-sql 
```

Once you're done, execute the following command to apply.
    
```bash
# symfony < 3.4
app/console audit:schema:update --force
```

```bash
# symfony >= 3.4
bin/console audit:schema:update --force
```

---

## Updating the schema
<span class="tag ml-3 mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-blue-100 text-blue-700">doctrine-provider</span>

After updating `auditor` library of `auditor-bundle`, the schema might need to be updated, 
you can do so by using the `audit:schema:update` command. 

This ensures that:

- all audit tables are created
- all audit tables have the expected structure and updates them if needed 

Open a command console, enter your project directory and execute the following command to 
review the new audit tables in the update schema queue.

```bash
# symfony < 3.4
app/console audit:schema:update --dump-sql 
```

```bash
# symfony >= 3.4
bin/console audit:schema:update --dump-sql 
```

Once you're done, execute the following command to apply.
    
```bash
# symfony < 3.4
app/console audit:schema:update --force
```

```bash
# symfony >= 3.4
bin/console audit:schema:update --force
```
