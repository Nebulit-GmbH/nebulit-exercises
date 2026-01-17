# Exercise 7: Building Projections

## Objective
Build projections that transform events into queryable read models.

## What is a Projection?

A projection:
- Subscribes to events
- Transforms events into a read-optimized format
- Maintains its own data store

## Projection Types

### Live Projections
- Process events in real-time
- Always up-to-date

### Catch-up Projections
- Replay historical events
- Then switch to live mode

## Implementation

```typescript
class OrderSummaryProjection {
  async handle(event: DomainEvent): void {
    switch (event.type) {
      case 'OrderPlaced':
        await this.db.insert({
          orderId: event.aggregateId,
          status: 'placed',
          total: event.payload.total,
        });
        break;
      case 'OrderShipped':
        await this.db.update(event.aggregateId, {
          status: 'shipped',
        });
        break;
    }
  }
}
```

## Tasks

1. Create a projection for customer order history
2. Handle projection failures gracefully
3. Implement projection position tracking
