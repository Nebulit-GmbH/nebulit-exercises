export interface Exercise {
  id: number;
  title: string;
  emoji: string;
  description: string;
  content: string;
}

export const exercises: Exercise[] = [
  {
    id: 1,
    title: "Getting Started with Event Sourcing",
    emoji: "🚀",
    description: "Learn the fundamentals of event sourcing and why it matters.",
    content: `# Exercise 1: Getting Started with Event Sourcing

## Objective
Understand the core concepts of event sourcing and how it differs from traditional state-based persistence.

## Key Concepts

### What is Event Sourcing?
Event sourcing is an architectural pattern where:
- **State changes are captured as events**
- Events are immutable and append-only
- Current state is derived by replaying events

### Why Event Sourcing?
- Complete audit trail of all changes
- Time travel debugging
- Flexible projection of data
- Natural fit for distributed systems

## Tasks

1. List 3 scenarios where event sourcing would be beneficial
2. Identify the difference between a **command** and an **event**
3. Explain why events should be immutable

## Example

\`\`\`typescript
// Traditional approach
user.balance = 100;

// Event sourcing approach
events.push({ type: 'MoneyDeposited', amount: 100 });
\`\`\`

> **Note:** Event sourcing is not just about storing events—it's a different way of thinking about your domain.
`,
  },
  {
    id: 2,
    title: "Designing Your First Event",
    emoji: "✨",
    description: "Create well-structured domain events with proper naming.",
    content: `# Exercise 2: Designing Your First Event

## Objective
Learn how to design meaningful domain events that capture business intent.

## Event Naming Conventions

### Use Past Tense
Events represent things that **have happened**:
- ✅ \`OrderPlaced\`
- ✅ \`PaymentReceived\`
- ❌ \`PlaceOrder\`
- ❌ \`ReceivePayment\`

### Be Specific
- ✅ \`CustomerEmailChanged\`
- ❌ \`CustomerUpdated\`

## Event Structure

\`\`\`typescript
interface DomainEvent {
  eventId: string;
  eventType: string;
  aggregateId: string;
  timestamp: Date;
  payload: Record<string, unknown>;
}
\`\`\`

## Tasks

1. Design 5 events for an e-commerce shopping cart
2. Include all necessary metadata
3. Ensure events are self-describing

## Best Practices

- Events should contain all data needed to understand what happened
- Avoid references to external entities when possible
- Include the actor/user who triggered the event
`,
  },
  {
    id: 3,
    title: "Building an Event Store",
    emoji: "💾",
    description: "Implement a simple in-memory event store.",
    content: `# Exercise 3: Building an Event Store

## Objective
Create a basic event store that can append and retrieve events.

## Core Operations

An event store needs these fundamental operations:
- **Append** events to a stream
- **Read** events from a stream
- **Read all** events (for projections)

## Implementation

\`\`\`typescript
interface EventStore {
  append(streamId: string, events: DomainEvent[]): Promise<void>;
  readStream(streamId: string): Promise<DomainEvent[]>;
  readAll(): Promise<DomainEvent[]>;
}
\`\`\`

## Tasks

1. Implement an in-memory event store
2. Add versioning to prevent conflicts
3. Implement optimistic concurrency control

## Considerations

- **Ordering**: Events must maintain their order
- **Atomicity**: All events in a batch succeed or fail together
- **Immutability**: Never modify or delete events

> **Hint:** Start simple with an array, then add complexity as needed.
`,
  },
  {
    id: 4,
    title: "Aggregates and Event Handlers",
    emoji: "🏗️",
    description: "Learn how aggregates process commands and emit events.",
    content: `# Exercise 4: Aggregates and Event Handlers

## Objective
Understand how aggregates serve as consistency boundaries and emit events.

## What is an Aggregate?

An aggregate is a cluster of domain objects that:
- Acts as a single unit for data changes
- Enforces business invariants
- Emits events when state changes

## Aggregate Structure

\`\`\`typescript
class ShoppingCart {
  private items: CartItem[] = [];
  private events: DomainEvent[] = [];

  addItem(product: Product, quantity: number): void {
    // Validate business rules
    if (quantity <= 0) {
      throw new Error('Quantity must be positive');
    }

    // Emit event
    this.apply({
      type: 'ItemAddedToCart',
      productId: product.id,
      quantity,
    });
  }

  private apply(event: DomainEvent): void {
    this.events.push(event);
    this.when(event);
  }

  private when(event: DomainEvent): void {
    // Update internal state based on event
  }
}
\`\`\`

## Tasks

1. Create a \`BankAccount\` aggregate with deposit/withdraw
2. Implement event application
3. Add business rule validation
`,
  },
  {
    id: 5,
    title: "Rebuilding State from Events",
    emoji: "🔄",
    description: "Reconstruct aggregate state by replaying events.",
    content: `# Exercise 5: Rebuilding State from Events

## Objective
Learn how to reconstruct the current state of an aggregate from its event history.

## The Rehydration Process

1. Load all events for the aggregate
2. Create a new aggregate instance
3. Apply each event in order
4. Result: Current state

## Implementation

\`\`\`typescript
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
\`\`\`

## Tasks

1. Implement a repository that loads aggregates from events
2. Handle the case when no events exist
3. Optimize with snapshots for long event streams

## Performance Tip

For aggregates with many events, consider **snapshots**:
- Periodically save the current state
- Load from snapshot + replay only new events
`,
  },
  {
    id: 6,
    title: "CQRS: Command Query Separation",
    emoji: "⚡",
    description: "Separate your read and write models for scalability.",
    content: `# Exercise 6: CQRS - Command Query Separation

## Objective
Implement CQRS to optimize reads and writes independently.

## What is CQRS?

**C**ommand **Q**uery **R**esponsibility **S**egregation:
- **Commands**: Change state (writes)
- **Queries**: Read state (reads)

## Why Separate?

- Different scaling requirements
- Optimized read models
- Simplified command handling
- Better performance

## Architecture

\`\`\`
Commands → Aggregates → Events → Event Store
                           ↓
                     Projections
                           ↓
                      Read Models → Queries
\`\`\`

## Tasks

1. Create a command handler for \`PlaceOrder\`
2. Create a query handler for \`GetOrderDetails\`
3. Build a read model optimized for listing orders

## Example

\`\`\`typescript
// Command side
class PlaceOrderHandler {
  async handle(cmd: PlaceOrder): Promise<void> {
    const order = new Order();
    order.place(cmd.items);
    await this.repository.save(order);
  }
}

// Query side
class OrderQueryHandler {
  async getOrderDetails(orderId: string): Promise<OrderDetails> {
    return this.readDb.findById(orderId);
  }
}
\`\`\`
`,
  },
  {
    id: 7,
    title: "Building Projections",
    emoji: "📊",
    description: "Create read models by projecting events.",
    content: `# Exercise 7: Building Projections

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

\`\`\`typescript
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
\`\`\`

## Tasks

1. Create a projection for customer order history
2. Handle projection failures gracefully
3. Implement projection position tracking
`,
  },
  {
    id: 8,
    title: "Event Versioning & Evolution",
    emoji: "📜",
    description: "Handle schema changes in your events over time.",
    content: `# Exercise 8: Event Versioning & Evolution

## Objective
Learn strategies for evolving your event schema without breaking existing functionality.

## The Challenge

Events are immutable, but requirements change. How do we:
- Add new fields?
- Remove deprecated fields?
- Rename events?

## Strategies

### 1. Weak Schema
\`\`\`typescript
// Always use optional fields
interface OrderPlaced {
  orderId: string;
  items: Item[];
  discountCode?: string; // Added in v2
}
\`\`\`

### 2. Upcasting
\`\`\`typescript
function upcast(event: any): OrderPlacedV2 {
  if (event.version === 1) {
    return {
      ...event,
      discountCode: null,
      version: 2,
    };
  }
  return event;
}
\`\`\`

### 3. Event Versioning
\`\`\`typescript
// Store version with event
{ type: 'OrderPlaced', version: 2, ... }
\`\`\`

## Tasks

1. Add a new field to an existing event
2. Implement an upcaster for backward compatibility
3. Write tests for both old and new event formats

## Golden Rule

> Never change the meaning of an existing event field. Add new fields instead.
`,
  },
  {
    id: 9,
    title: "Testing Event-Sourced Systems",
    emoji: "🧪",
    description: "Write effective tests for your event-sourced application.",
    content: `# Exercise 9: Testing Event-Sourced Systems

## Objective
Master testing patterns specific to event-sourced applications.

## Testing Approaches

### Given-When-Then

The natural way to test aggregates:

\`\`\`typescript
test('adding item to cart', () => {
  // Given
  const cart = new ShoppingCart();
  cart.apply(new CartCreated({ cartId: '123' }));

  // When
  cart.addItem({ productId: 'abc', quantity: 2 });

  // Then
  expect(cart.uncommittedEvents).toContainEqual(
    expect.objectContaining({
      type: 'ItemAddedToCart',
      productId: 'abc',
      quantity: 2,
    })
  );
});
\`\`\`

### Testing Projections

\`\`\`typescript
test('projection updates on order shipped', async () => {
  const projection = new OrderProjection();
  
  await projection.handle(new OrderPlaced({ orderId: '1' }));
  await projection.handle(new OrderShipped({ orderId: '1' }));
  
  const order = await projection.getOrder('1');
  expect(order.status).toBe('shipped');
});
\`\`\`

## Tasks

1. Write tests for an aggregate using Given-When-Then
2. Test a projection with multiple event types
3. Test error scenarios and invariant violations
`,
  },
  {
    id: 10,
    title: "Production Considerations",
    emoji: "🚀",
    description: "Prepare your event-sourced system for production.",
    content: `# Exercise 10: Production Considerations

## Objective
Learn what it takes to run event sourcing in production.

## Key Concerns

### 1. Event Store Selection

Popular options:
- **EventStoreDB** - Purpose-built for event sourcing
- **PostgreSQL** - With proper schema design
- **MongoDB** - Document-based approach

### 2. Scalability

\`\`\`
Considerations:
├── Partitioning by aggregate ID
├── Read replica for projections
├── Async projection processing
└── Snapshot optimization
\`\`\`

### 3. Monitoring

Track these metrics:
- Event append latency
- Projection lag
- Event store size
- Failed event processing

### 4. Disaster Recovery

- Regular backups of event store
- Projection rebuild capability
- Event archival strategy

## Tasks

1. Design a backup strategy for your event store
2. Implement health checks for projections
3. Create runbooks for common issues

## Checklist

- [ ] Idempotent event handlers
- [ ] Projection checkpointing
- [ ] Error handling and dead letter queues
- [ ] Monitoring and alerting
- [ ] Documentation

> **Remember:** Event sourcing is powerful but adds complexity. Make sure it's the right fit for your use case.
`,
  },
];
