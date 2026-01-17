# Exercise 4: Aggregates and Event Handlers

## Objective
Understand how aggregates serve as consistency boundaries and emit events.

## What is an Aggregate?

An aggregate is a cluster of domain objects that:
- Acts as a single unit for data changes
- Enforces business invariants
- Emits events when state changes

## Aggregate Structure

```typescript
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
```

## Tasks

1. Create a `BankAccount` aggregate with deposit/withdraw
2. Implement event application
3. Add business rule validation
