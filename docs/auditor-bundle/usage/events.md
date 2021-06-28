---
title: "Events"
introduction: "A guide to using auditor-bundle."
previous:
    text: Querying
    url: /docs/auditor-bundle/usage/querying.html
next:
    text: Maintenance
    url: /docs/auditor-bundle/usage/maintenance.html
---

`auditor` fires a `LifecycleEvent` for every audit log entry.
You can subscribe to these events and add your custom logic, this opens the doors to:

- log entries in non SQL datastore such as Elasticsearch for example.
- send an email/notification if a specific entity has been changed.
- etc

As a reference, you can have a look at the bundled `AuditEventSubscriber`


## Subscribing to audit events
<span class="tag mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-green-100 text-green-700">auditor</span>

First you have to create an event subscriber that listens to `LyfecycleEvent` events.

```php
<?php

namespace App\Event;

use DH\Auditor\Event\LifecycleEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class MySubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            LifecycleEvent::class => 'onAuditEvent',
        ];
    }

    public function onAuditEvent(LifecycleEvent $event): LifecycleEvent
    {
        // do your stuff here...

        return $event;
    }
}
```

Then, any time an `LifecycleEvent` is fired, the `MySubscriber::onAuditEvent()` method 
will be run with the event as an argument.
