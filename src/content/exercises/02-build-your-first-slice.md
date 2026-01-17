# Exercise 2: Build your first Slice

## Objective

Build a first State Change Slice.

## Key Concepts

- learn how to apply Events
- learn what an Aggregate is
- learn about Project Structure

## Tasks

Switch to the branch 'exercise-1/state-change-slice'

![State Change Slice](/2/1.png)

## Example

Run the code gen container

```kotlin
docker run -ti -p 3001:3000 -v $PWD:/workspace -e HOST_WORKSPACE=$PWD --name codegen --rm nebulit/codegen
```

In this Workshop we focus on the Axon Generator.
Axon is a production ready Event Sourcing Framework on the JVM

```kotlin
b02087dd1985:/workspace# gen
? Which generator? (Use arrow keys)
❯ axon 
  emmet 
  sample-generator 
  eventcatalog 
  live-prototype 
  nextjs-prototype 
  open-api 
```

The Skeleton Generator generates a bare Spring Boot Application. This is already done.

Generate your Slice.

```kotlin
What should be generated?
Skeleton
❯ slices
aggregates
```

Choose Create Catalog Entry

```kotlin
? Choose Slices to generate? (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
◯ slice: Archive Catalog Entry
◯ slice: Catalog Entries
◯ slice: Catalog Entry Details
❯◉ slice: Create Catalog Entry
◯ slice: Export Item
◯ slice: Export Item Archived
```

this generates Command, an API and a Test Case.

```kotlin
starting commands generation
? Choose Slices to generate? slice: Create Catalog Entry
create src/main/kotlin/de/eventmodelers/catalog/createcatalogentry/README.md
create src/main/kotlin/de/eventmodelers/catalog/createcatalogentry/.slice.json
create src/main/kotlin/de/eventmodelers/catalog/domain/commands/createcatalogentry/package-info.java
create src/main/kotlin/de/eventmodelers/catalog/domain/commands/createcatalogentry/CreateCatalogEntryCommand.kt
create src/main/kotlin/de/eventmodelers/events/CatalogueEntryCreatedEvent.kt
create src/main/kotlin/de/eventmodelers/catalog/createcatalogentry/internal/CreateCatalogEntryResource.kt
create src/test/kotlin/de/eventmodelers/catalog/createcatalogentry/CreateCatalogEntryTest.kt
```

Generate an Aggregate. The Aggregate takes care of applying Events to your Event Stream.

```
? Which generator? axon
? What should be generated? 
  Skeleton 
  slices 
❯ aggregates 

```

There is only one Aggregate to select.

```
? What should be generated? aggregates
starting aggregates generation
? Which Aggregate should be generated? (Use arrow keys)
❯ Catalogue Management 
```

Choose the Slice you want to generate. This generates the Command Handlers.

```
? Choose for which Slices to generate Commands- and Eventsourcing Handlers. (generates to .tmp file) (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
❯◯ slice: Archive Catalog Entry
◉ slice: Create Catalog Entry
◯ slice: Publish Item
◯ slice: Update Catalog Entry
```

## Testing

You can start the application. It takes care of running everything you need.

![State Change Slice](/2/2.png)

There is a generated Swagger API you can access here:

````
http://localhost:8080/swagger-ui/index.html
````

Use the Events Debug Controller to access an Event Stream.

![State Change Slice](/2/3.png)