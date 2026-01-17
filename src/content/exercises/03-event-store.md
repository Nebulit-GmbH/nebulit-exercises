# Exercise 3: Building an Event Store

## Objective
Create a basic event store that can append and retrieve events.

## Core Operations

An event store needs these fundamental operations:
- **Append** events to a stream
- **Read** events from a stream
- **Read all** events (for projections)

## Implementation

```typescript
interface EventStore {
  append(streamId: string, events: DomainEvent[]): Promise<void>;
  readStream(streamId: string): Promise<DomainEvent[]>;
  readAll(): Promise<DomainEvent[]>;
}
```

## Tasks

1. Implement an in-memory event store
2. Add versioning to prevent conflicts
3. Implement optimistic concurrency control

## Considerations

- **Ordering**: Events must maintain their order
- **Atomicity**: All events in a batch succeed or fail together
- **Immutability**: Never modify or delete events

> **Hint:** Start simple with an array, then add complexity as needed.
