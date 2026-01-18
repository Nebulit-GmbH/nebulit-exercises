# Exercise 8: Metadata

## Objective

- Learn why Meta Data is so powerful
- What meta data is crucial?
- what information should be Meta Data, what should be on the payload?

## Why Meta Data is often forgotten

Meta Data gives additional information for commands, events and projections. 
It gives Context that is available everywhere.

## Exercise

Switch to the Branch 'exercise-8/metadata'

On this Branch, we enabled Meta Data by enforcing the "X-User-Id" Metadata on every Command.

Open the UI and try to create a Catalog Item, it´ll fail. The UI is already sending the HTTP Header "X-User-ID",
but it´s not translated to the Command.

The error is this

```

java.lang.IllegalArgumentException: Missing required header: X-User-Id
	at de.eventmodelers.support.metadata.MetaDataCommandInterceptor.handle$lambda$0(MetaDataCommandInterceptor.kt:17)
	
```

In addition, copying Meta Data is enabled. So the X-User-Id, Correlation-Id and Causation-Id Headers are copied 
from Message to message. This means, the Context ( in this case the User ID ) is available in the whole system.
Also later in Automations.

We need to adjust the CreateCatalogEntryResource and translate the incoming HTTP Headers to Message Metadata.


```
@CrossOrigin
@PostMapping("/createcatalogentry/{id}")
fun processCommand(
    @RequestBody payload: CreateCatalogEntryPayload,
    @RequestHeader(SESSION_ID_HEADER) sessionId: String): CompletableFuture<Any> {
    return commandGateway.send(
        CreateCatalogEntryCommand(
            itemId = payload.itemId,
            title = payload.title,
            author = payload.author,
            description = payload.description,
            createdDate = LocalDateTime.now()
        ),
        // add meta data to command
        MetaData.with(SESSION_ID_HEADER, sessionId)
    )
}
```

Restart the Application and add a new item.

Go to http://localhost:8080/swagger-ui/index.html#/events-debug-controller/resolveEvents and use the Id
of the Item you just created.

You should see traceId, correlationId and the new X-Session-Id stored in every Event.

```
 {
    "type": "CatalogueManagementAggregate",
    "aggregateIdentifier": "f60589ec-2e38-4f63-847f-c84e2010ed7f",
    "sequenceNumber": 0,
    "identifier": "c7436aeb-1669-4f83-9971-333772132924",
    "timestamp": "2026-01-18T14:03:29.763Z",
    "payload": {
      "author": "1",
      "description": "1",
      "itemId": "f60589ec-2e38-4f63-847f-c84e2010ed7f",
      "title": "1",
      "createdDate": "2026-01-18T15:03:29.013856"
    },
    "metaData": {
      "traceId": "723c40a7-4bf4-4673-b593-db6c8378f640",
      "X-Session-Id": "c7739357-c4cd-4eec-889b-360d41c79e22",
      "correlationId": "723c40a7-4bf4-4673-b593-db6c8378f640"
    },
    "payloadType": "de.eventmodelers.events.CatalogueEntryCreatedEvent"
  },
 ```

## Learnings

- Meta Data is a powerful way to add Context Information to your Messages

