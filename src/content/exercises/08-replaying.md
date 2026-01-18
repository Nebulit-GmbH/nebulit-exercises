# Exercise 7: Replaying

## Objective

- Learn about Fake-Events.
- Learn how to replay Events in a safe way. 

## Why is replaying required?

By Replaying Events, you can evolve your projections over time ( be it fixing a bug or adding information ).
But you need to be careful - because Replaying can impact users.

## Exercise

Switch to the Branch 'exercise-7/replaying'

Start the Application and access it using your locally running UI or https://eventsourcing-workshop-ui.vercel.app/

You see an empty Catalog.

Open your configuration file "application.yml" in src/main/resources

Uncomment the Fake Event Provider.

```
#createcatalogentry:
#  fakeevents:
#    enabled: true
```

Fake Events is a common way to provide initialization data for slices.

Restart the application and refresh a few times, you´ll see the Catalog gradually filling.

![TODO Lists](/6/1.png)

Wait until the Catalog is filled ( intentionally running slow ). 

Then issue a Replay. Open the Swagger UI.

http://localhost:8080/swagger-ui/index.html#/replay-controller/startReplay

And request a replay for the 'catalog' processor. 
use 'catalog' as processing group.

![TODO Lists](/6/2.png)

Open the Catalog again. You´ll see it´s refilling from the start. 

## Tasks

In this exercise, we want to add the "Created Date" to our Catalog Items.
For this we´ll need to add a new column to our projection.

Open the "CatalogEntriesReadModelEntity" in src/main/kotlin
Package "de.eventmodelers.catalog.catalogentries"

Add a new column definition:

```
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "createdDate")
    var createdDate: LocalDateTime? = null
```

Restart the application. The date should now show up after the items are applied.

## Problem

The replay clears the table. Customers see partial or outdated information. 

## Solution 1

Treat the projection as Append-Only.

Tables aren´t clear but new fields are appended.

Simplest solution, but not always applicable.

## Solution 2

Rebuild the projection in the background and switch when done. 

Steps:
- rename the table to "catalog_entries_read_model_entity_temp"
- switch the existing proection to continue with the renamed table
- copy the projection, adjust the logic and project to catalog_entries_read_model_entity
- switch the client when the projection caught up
- delete catalog_entries_read_model_entity_temp and the old slice

So effectively, we treat a replay like a new Slice.

## Solution 3

Snapshot the current projection ( in memory or to a temporary Document like a JSON Blob ) and continue to serve clients from this.


## Learnings

- Replaying is powerful, but needs to be properly planned
- There is no one size fits all.

