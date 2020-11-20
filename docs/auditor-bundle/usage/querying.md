---
title: "Querying audits"
introduction: "A guide to using auditor-bundle."
previous:
    text: Viewer
    url: /docs/auditor-bundle/usage/viewer.html
next:
    text: Events
    url: /docs/auditor-bundle/usage/events.html
---

`auditor` provides both a [query](/docs/auditor-bundle/querying#query-doctrine-provider) object and a [reader](/docs/auditor-bundle/querying#reader-doctrine-provider) to query the full history of any audited entity and even paginate results.

## Reader
<span class="tag mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-blue-100 text-blue-700">doctrine-provider</span>

The `Reader` makes it easy to query and retrieve audits from the storage.
It heavily relies on the [`Query`](/docs/auditor-bundle/querying#query-doctrine-provider) object and takes care of checking roles and auditable state of a given entity.

The `Reader` takes a provider as the only parameter of its constructor.

Example:
```php
$reader = new Reader($provider);
```

### Preparing a query
Querying the audits is done by preparing a query and running it.  
Creating a query is done by calling `Reader::createQuery(string $entity, array $options = []): Query`

Example:
```php
$reader = new Reader($provider);

// creates a query on Author audits without any option set
// this would return all the author audits 
$query = $reader->createQuery(Author::class);
```

It is possible to specify filters to be applied to the created query using the `$options` parameter.

- `type` add a filter on the audit type (`INSERT`, `UPDATE`, `REMOVE`, `ASSOCIATE`, `DISSOCIATE`)
- `object_id` add a filter on the audited element ID
- `transaction_hash` add a filter on the transaction hash
- `page` will select the given page of entries
- `page_size` defines the page size

Examples:
```php
$reader = new Reader($provider);

// creates a query on Author audits with a filter on the object ID
// audits of the author which ID is not 5 will be filtered out. 
$query = $reader->createQuery(Author::class, [
    'object_id' => 5,
]);

// the above code could also be written like this 
$query = $reader
    ->createQuery(Author::class)
    ->addFilter(Query::OBJECT_ID, 5);
;
```


### Retrieving audits
Once a query has been created and prepared, it has to be executed to retrieve audits.

Example:
```php
$reader = new Reader($provider);

// creates a query on Author audits
$query = $reader->createQuery(Author::class);

// retrieves audit entries for Author entity
/** @var DH\Auditor\Model\Entry[] $audits */
$audits = $query->execute();

// retrieves audit entries for Author entity (oneliner)
/** @var DH\Auditor\Model\Entry[] $audits */
$audits = $reader->createQuery(Author::class)->execute();
```

**Note:** retrieving audits using the above method is scoped to a single entity. 
A transaction generally spans across multiple entities so retrieving audit entries belonging to a transaction 
could be tough. 
To make it easier, a dedicated method is available: `Reader::getAuditsByTransactionHash(string $transactionHash): array`


Example:
```php
$reader = new Reader($provider);

// retrieves audit entries across all entities for the given transaction hash: '123abc'
/** @var DH\Auditor\Model\Entry[] $audits */
$audits = $reader->getAuditsByTransactionHash('123abc');
```



---

## Query
<span class="tag mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-blue-100 text-blue-700">doctrine-provider</span>

The `Query` object is a thin wrapper on top of Doctrine's `Doctrine\DBAL\Query\QueryBuilder`.
It allows to query and retrieve audits from the storage.

The `Query` object takes both a table name and a connection (Doctrine) as parameters of its constructor.

Example:
```php
// create a Query object to query/retrieve data from `author_audit` table.
$query = new Query('author_audit', $connection);
```

### Filters
By default, a query object will return **all** the audit entries of the related table when executed. 
This can be a very expensive task (both time and memory consuming) and ultimately of little interest.
But of course, you can refine the query by adding filters.  

There are three types of filters:

- standard filter
- standard range filter 
- date range filter 

You can get the list of available filters by calling `Query::getSupportedFilters()`

This method will return an array of available filters.
They also are available as constants of the `Query` class.

- `Query::TYPE` allows to filter by audit type (`INSERT`, `UPDATE`, `REMOVE`, `ASSOCIATE`, `DISSOCIATE`)
- `Query::CREATED_AT` allows to filter by audit creation date and time 
- `Query::TRANSACTION_HASH` allows to filter by transaction hash
- `Query::OBJECT_ID` allows to filter by audited element ID
- `Query::USER_ID` allows to filter by user
- `Query::ID` allows to filter by audit ID
- `Query::DISCRIMINATOR` allows to filter by discriminator (cf. Doctrine inheritance)

#### Standard filter
A standard filter can be applied by using `Query::addFilter(string $name, $value): self` 

Examples:
```php
// filtering audit entries whose transaction hash is exactly '123abc'
$query = new Query('author_audit', $connection);
$query->addFilter(Query::TRANSACTION_HASH, '123abc');
```

#### Standard range filter
A standard range filter can be applied by using `Query::addRangeFilter(string $name, $minValue = null, $maxValue = null): self` 

**Note:** bounds (`$minValue` and `$maxValue`) can't be null simultaneously.

Examples:
```php
// filtering audit entries whose object ID (author ID) is >= 10
$query = new Query('author_audit', $connection);
$query->addRangeFilter(Query::OBJECT_ID, 10);       

// filtering audit entries whose object ID (author ID) is <= 10
$query = new Query('author_audit', $connection);
$query->addRangeFilter(Query::OBJECT_ID, null, 10); 

// filtering audit entries whose object ID (author ID) is >= 10 and <= 25
$query = new Query('author_audit', $connection);
$query->addRangeFilter(Query::OBJECT_ID, 10, 25);   
```

#### Date range filter
A date range filter can be applied by using `Query::addDateRangeFilter(string $name, ?DateTime $minValue = null, ?DateTime $maxValue = null): self` 

**Note:** bounds (`$minValue` and `$maxValue`) can't be null simultaneously.

Examples:
```php
$min = DateTime::createFromFormat('Y-m-d', '2020-01-17');
$max = DateTime::createFromFormat('Y-m-d', '2020-01-19');

// filtering audit entries whose creation date is >= 2020-01-17
$query = new Query('author_audit', $connection);
$query->addDateRangeFilter(Query::CREATED_AT, $min);        

// filtering audit entries whose creation date is <= 2020-01-19
$query = new Query('author_audit', $connection);
$query->addDateRangeFilter(Query::CREATED_AT, null, $max);  

// filtering audit entries whose creation date is between 2020-01-17 and 2020-01-19
$query = new Query('author_audit', $connection);
$query->addDateRangeFilter(Query::CREATED_AT, $min, $max);  
```

#### Multiple filters
When adding multiple filters, they are combined with an `and` logic. 


### Ordering
Query results can be ordered by calling `Query::addOrderBy(string $field, string $direction = 'DESC'): self`

Example:
```php
$query = new Query('author_audit', $connection);
$query->addOrderBy(Query::CREATED_AT, 'ASC');

$entries = $query->execute();   // entries are ordered by ascendant creation date/time 
```


### Limit & offset
It is possible to extract only a portion of the results at a specific offset by calling `Query::limit(int $limit, int $offset = 0): self`

**Note:** offset starts at 0

Example:
```php
// only the first 10 results
$query = new Query('author_audit', $connection);
$query->limit(10);     

// 10 results starting at the 6th result (from the 6th to 15th)
$query = new Query('author_audit', $connection);
$query->limit(10, 5);     
```


### Executing
Queries are executed by calling `Query::execute(): array`

Example:
```php
// filtering audit entries whose transaction hash is exactly '123abc'
$query = new Query('author_audit', $connection);
$query->addFilter(Query::TRANSACTION_HASH, '123abc');

$entries = $query->execute();   // $entries is populated 
```


### Counting
It is possible to count results without retrieving them by calling `Query::count(): int`

Example:
```php
$query = new Query('author_audit', $connection);
$query->addFilter(Query::TRANSACTION_HASH, '123abc');

$count = $query->count();   // $count holds the number of audit entries matching the applied filters
```
