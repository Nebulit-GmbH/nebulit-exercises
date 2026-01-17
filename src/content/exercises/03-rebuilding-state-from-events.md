# Exercise 3: Build a State View Slice


## Objective

For this Slice, you will implement a persistent projection using a relational table.

## Key Concepts

- learn how project Events
- apply Code Generation
- apply AI

## Hint

you can either again use the Code Generation from the last exercise or give 
Claude Code a try using the provided skills.

You can use this prompt

```
Implement the catalgitems slice using cour state view slice skill
```

## Implementation

Implement a Projector in your Slice Package.

```kotlin

@Component
class CatalogEntriesReadModelProjector(private val repository: CatalogEntriesReadModelRepository) {

    @EventHandler
    fun on(event: CatalogueEntryCreatedEvent) {
        val entity = repository.findById(event.itemId).orElse(CatalogEntriesReadModelEntity())
        entity
            .apply {
                itemId = event.itemId
                title = event.title
            }
            .also { repository.save(it) }
    }
}

```

Next step is to implement a Query Handler.

```
@Component
class CatalogEntriesReadModelQueryHandler(
    private val repository: CatalogEntriesReadModelRepository
) {
  @QueryHandler
  fun handleQuery(query: CatalogEntriesReadModelQuery): CatalogEntriesReadModel {
    return CatalogEntriesReadModel(repository.findAll())
  }
}
```

Last step - implement an HTTP API to be accessible by the frontend.
Make sure to provide this Endpoint "/catalogentries"

```
@RestController
class CatalogentriesResource(
    private var queryGateway: QueryGateway
) {

    var logger = KotlinLogging.logger {}

    @CrossOrigin
    @GetMapping("/catalogentries")
    fun findReadModel(): CompletableFuture<CatalogEntriesReadModel> {
        return queryGateway.query(CatalogEntriesReadModelQuery(), CatalogEntriesReadModel::class.java)
    }

}
```

## Learnings

- **Ordering**: Events must maintain their order in the projection. Axon ensures this.
- **Direct Client Access**: Think about this for a second - would it be possible to give the client direct access to the projection table?

> **Hint:** Think about the possibilities of projections.
