# Exercise 5: Rebuilding State from Events

## Objective
Learn how to reconstruct the current state of an aggregate from its event history.

## The Rehydration Process

1. Load all events for the aggregate
2. Create a new aggregate instance
3. Apply each event in order
4. Result: Current state

## Implementation

```typescript
class AggregateRepository<T extends Aggregate> {
  async load(id: string): Promise<T> {
    const events = await this.eventStore.readStream(id);
    const aggregate = new this.aggregateType();
    
    for (const event of events) {
      aggregate.apply(event);
    }
    
    return aggregate;
  }
}
```

## Tasks

1. Implement a repository that loads aggregates from events
2. Handle the case when no events exist
3. Optimize with snapshots for long event streams

## Performance Tip

For aggregates with many events, consider **snapshots**:
- Periodically save the current state
- Load from snapshot + replay only new events
