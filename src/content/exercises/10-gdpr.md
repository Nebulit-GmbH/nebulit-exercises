# Exercise 9: GDPR

## Objective

- How do you handle PII relevant information?
- How do you persist data compliant with GDPR?

## The most important thing to consider

Stream Design - design your streams to be short. 
Design for "deletability"

For example don´t mix PII and non PII data if possible.

## Crypto Shredding

The idea of crypto shredding is simple. Don´t store plain PII relevant data in your event streams, but 
encrypt it.

Typically we use something like AES to encrypt / decrypt information.

On the branch you find one possible implementation which is used in a very similar way in production today. 

```
data class CatalogueEntryCreatedEvent(
    @EncryptionKeyIdentifier
    var itemId: String,
    var description: String,
    @EncryptedField
    var author: String,
    var title: String,
    var createdDate: LocalDateTime
) : Event
```

Start your Application and create a Catalog Item.

## Encrypted Data

You don´t see anything special at runtime. Data gets encrypted / decrypted transparently at the Serialization-Level.

Open the Swagger-UI and look at the Event Stream for your just created item ( you can copy the ID from the URL )

http://localhost:8080/swagger-ui/index.html#/events-debug-controller/resolveEvents

![Crypto Shredding](/10/1.png)

To see the encrypted Value, you need to go directly to the Database.

Open the table "domain_event_entry"

![Crypto Shredding](/10/2.png)

Use the global index to load the JSON payload from the OID store.

```
SELECT lo_get(payload::oid) AS payload_content FROM domain_event_entry WHERE global_index=1;
```

There you see the encrypted value. Pay attention to the author field.

```
   "itemId":"39c6c5fa-8c04-434d-bae3-97b8c36b129c",
   "author":"nH4x92x+TpK2l1Thcjm6CqgREkW/z2x2jc0TKVFFdKvJRQ==",
   "description":"",
   "title":"Harry Potter",
   "createdDate":[
      2026,
      1,
      18,
      20,
      42,
      34,
      156653000
   ]
}
```

## Learnings

- Learn the basic mechanics of Crypto Shredding
- Understand how keys are used and stored
