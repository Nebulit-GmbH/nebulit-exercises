# Exercise 6: CQRS - Command Query Separation

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

```
Commands → Aggregates → Events → Event Store
                           ↓
                     Projections
                           ↓
                      Read Models → Queries
```

## Tasks

1. Create a command handler for `PlaceOrder`
2. Create a query handler for `GetOrderDetails`
3. Build a read model optimized for listing orders

## Example

```typescript
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
```
