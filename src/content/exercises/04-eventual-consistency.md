# Exercise 4: Eventutal Consistency

## Objective

Understand how to make use of eventual consistency

## Key Concepts

Eventual Consistency is a Feature, not a Bug.
But it´s crucial to understand the benefits and trade-offs.

## Exercise

Switch to Branch "exercise-3/eventual-consistency"

On this Branch, the Projection from the last exercise runs very slow. 
Adding a new Catalog Item takes a long time to get projected to our persited table.

### Option 1 - Use Inline Projection

Open **application.yml** and uncomment these lines. Then restart the application.

```
  #eventhandling:
  #  processors:
  #    catalog:
  #      mode: subscribing
```

This makes the Event Processor for this projection a Subscribing-Processor ( sometimes referred to as inline projection ).
Basically the projection runs in the same Thread. If the Projection takes long, the UI blocks.

Add a Catalog Item to see the effect.

What are the benefits and Drawbacks?

### Option 2 - Use Client Notifications

Switch the configuration in the application.yml back to tracking ( the default )

```
  eventhandling:
    processors:
      catalog:
        mode: tracking
```

Now adding an Item to the Catalog doesn´t block the UI, but the item is also not showing up.

There are different ways to deal with this. The simplest - just redirect the User somewhere else and let the Projection catch up in the background.

Another option is to use a notification mechanism to notify the client when the projection caught up.

![Client Notifications](/4/1.png)

## Enable Notifications

Open the class CatalogEntriesReadModelProjector.

Annotate the Event Handler with @NotifyClient

```
    @NotifyClient
    @EventHandler
    fun on(event: CatalogueEntryCreatedEvent) {
        Thread.sleep(15000)
        val entity = repository.findById(event.itemId).orElse(CatalogEntriesReadModelEntity())
        entity
            .apply {
                itemId = event.itemId
                title = event.title
            }
            .also { repository.save(it) }
    }
```

This sends a notification to the client when the Projector is done. This is the correct place to handle notifications.

### Testing Notifications

Restart the Application.
Open the webapp.
Add a Catalogue Item.
Wait 15 seconds, and you´ll see the notification that automatically refreshes all data.

![Client Notifications](/4/2.png)

The implementation uses Server Sent Events in the Background.


## Tasks

1. Create a `BankAccount` aggregate with deposit/withdraw
2. Implement event application
3. Add business rule validation
