# Exercise 6: Todo Lists as Event Processors

## Objective

Many TODO Lists are simply Event Processors. This simplifies the implementation (sometimes)

## What is a TODO List?

Any automatic process needs a control mechanism. 
TODO Lists are completely controlled by Events.

One Event opens a TODO Item, another Event closes it.

Switch to the branch "exercise-5/todo-lists-event-processing"

## Implementation

## Tasks

Simply delete the whole "item details to fetch" Slice. We won´t need it.
We keep the Read Model in the Event Model, but there will be no implementation.

![TODO Lists](/5/1.png)

Switch the Processor to an Event-based Processor.

Adjust the "add missing data" Slice and change the ItemsFetcherProcessor. Implement an Event Handler.

```
    @EventHandler
    fun on(event: CatalogueEntryCreatedEvent) {

        // external systems call
        val bookDetails = fetchExternalDataFromWarehouse.fetch(event.itemId)

        // fire command
        commandGateway.send<AddMissingDataCommand>(
            AddMissingDataCommand(
                itemId = event.itemId,
                bookDetails.title,
                bookDetails.author,
                bookDetails.description
            )
        )
    }
```

To not fire the external Call on every Replay, you can disallow replays.
Just add @DisallowReplay to the Component.

## Learnings

- Axon guarantees that an Event is only processed once.
- TODO Lists and Automations can be implemented as simple Event Processors.
- Be aware of Replays.

