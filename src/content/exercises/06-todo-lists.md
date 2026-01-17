# Exercise 6: Todo Lists

## Objective
Understand the concept of a TODO List and how it enables to control automatic processes in the system.


## What is a TODO List?

A list of things an Automation needs to process.
This can literally be anything.

![TODO Lists](/5/1.png)

Any automatic process needs a control mechanism. 
TODO Lists are completely controlled by Events.

One Event opens a TODO Item, another Event closes it.

Switch to the branch "exercise-5/todo-lists-scheduled"

## Implementation

### One crucial thing to understand

Just because the TODO List ( green sticky note ) is in the Event Model doesn´t mean it´s in Code.

## Tasks

A TODO List is just a simple projection - typically either with a flag ( done / not done ) or the TODO Item itself
that gets deleted when the TODO is resolved.

Implement the projection for the slice "Item Details to fetch" as a scheduled processor. This is one way to implement TODO Lists, 
in the next exercise you will see the other way ( event triggered )

Start the Generator. Select the Slice.

```
? Which generator? axon
? What should be generated? slices
starting commands generation
? Choose Slices to generate? (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
 ◯ slice: Create Catalog Entry
 ◯ slice: Export Item
 ◯ slice: Export Item Archived
 ◯ slice: Item Details for publication
❯◉ slice: Item Details to fetch
 ◯ slice: Items to publish
 ◯ slice: Publish Item
```

( you can safely delete the generated Query Handler)

### Implementation

```
@Component
class ItemDetailsToFetchReadModelProjector(
    var repository: ItemDetailsToFetchReadModelRepository
) {


    @EventHandler
    fun on(event: CatalogueEntryCreatedEvent) {
        val entity = this.repository.findById(event.itemId).orElse(ItemDetailsToFetchReadModelEntity())
        entity.apply {
            itemId = event.itemId
            fetched = false
        }.also { this.repository.save(it) }
    }

    @EventHandler
    fun on(event: ItemInformationAddedEvent) {
        this.repository.deleteById(event.itemId)
    }

}

```

Now we just need a processor to run over all items not yet processed every few seconds.

Generate the Automation Slice. 

```
? Choose Slices to generate? (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
❯◉ slice: Add Missing Data
 ◯ slice: Archive Catalog Entry
 ◯ slice: Catalog Entries
 ◯ slice: Catalog Entry Details
 ◯ slice: Create Catalog Entry
```

You can use the Mock-Service "FetchExternalDataFromWarehouse" to fetch data. 

```
@Component
class FetchExternalDataFromWarehouse {

    fun fetch(id:String): BookInfo {
        return BookInfo("Harry Potter", "j.k. rowling", "external information")
    }
}
```

The Implementation of the Processor is simple and uses the built-in scheduler support using the @Scheduled-Annotation.

```
// runs every 60 seconds
    @Scheduled(fixedDelay = 60000)
    fun process() {

        // query all TODO Items
        queryGateway.query(
            ItemDetailsToFetchReadModelQuery(),
            ItemDetailsToFetchReadModel::class.java
        ).thenAccept {
            // iterate over all items
            it.data.forEach {
                // external systems call
                val bookDetails = fetchExternalDataFromWarehouse.fetch(it.itemId)

                // fire command for each item
                commandGateway.send<AddMissingDataCommand>(
                    AddMissingDataCommand(
                        itemId = it.itemId,
                        bookDetails.title, bookDetails.author, bookDetails.description
                    )
                )
                
                // if the command is eventually processed, this will close the TODO Item
            }

        }
```

If you run the App now, you´ll realize that the TODO never gets closed.

We didn´t implement a Command Handler in the Catalog Management Aggregate.

```
 @CommandHandler
    fun handle(command: AddMissingDataCommand) {
        AggregateLifecycle.apply(
            ItemInformationAddedEvent(
                command.itemId,
                command.title,
                command.author,
                command.description
            )
        )
    }
```


## Learnings

- TODO Lists can be very simple
- Sometimes a scheduled Processor is the easiest thing to do.
- A little harder to control duplicate processing.

