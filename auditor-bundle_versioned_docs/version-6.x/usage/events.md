---
title: "Events"
---

`auditor` fires a `LifecycleEvent` for every audit log entry.
You can subscribe to these events and add your custom logic, this opens the doors to:

- log entries in non SQL datastore such as Elasticsearch for example.
- send an email/notification if a specific entity has been changed.
- etc

As a reference, you can have a look at the bundled `AuditEventSubscriber`


## Subscribing to audit events
`auditor`

First you have to create an event subscriber that listens to `LifecycleEvent` events.

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

Then, any time a `LifecycleEvent` is fired, the `MySubscriber::onAuditEvent()` method 
will be run with the event as an argument.
