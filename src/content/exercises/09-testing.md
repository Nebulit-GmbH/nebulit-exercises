# Exercise 9: Testing Event-Sourced Systems

## Objective
Master testing patterns specific to event-sourced applications.

## Testing Approaches

### Given-When-Then

The natural way to test aggregates:

```typescript
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
```

### Testing Projections

```typescript
test('projection updates on order shipped', async () => {
  const projection = new OrderProjection();
  
  await projection.handle(new OrderPlaced({ orderId: '1' }));
  await projection.handle(new OrderShipped({ orderId: '1' }));
  
  const order = await projection.getOrder('1');
  expect(order.status).toBe('shipped');
});
```

## Tasks

1. Write tests for an aggregate using Given-When-Then
2. Test a projection with multiple event types
3. Test error scenarios and invariant violations
