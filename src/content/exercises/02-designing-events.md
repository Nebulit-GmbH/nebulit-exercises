# Exercise 2: Designing Your First Event

## Objective
Learn how to design meaningful domain events that capture business intent.

## Event Naming Conventions

### Use Past Tense
Events represent things that **have happened**:
- ✅ `OrderPlaced`
- ✅ `PaymentReceived`
- ❌ `PlaceOrder`
- ❌ `ReceivePayment`

### Be Specific
- ✅ `CustomerEmailChanged`
- ❌ `CustomerUpdated`

## Event Structure

```typescript
interface DomainEvent {
  eventId: string;
  eventType: string;
  aggregateId: string;
  timestamp: Date;
  payload: Record<string, unknown>;
}
```

## Tasks

1. Design 5 events for an e-commerce shopping cart
2. Include all necessary metadata
3. Ensure events are self-describing

## Best Practices

- Events should contain all data needed to understand what happened
- Avoid references to external entities when possible
- Include the actor/user who triggered the event
