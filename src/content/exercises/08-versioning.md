# Exercise 8: Event Versioning & Evolution

## Objective
Learn strategies for evolving your event schema without breaking existing functionality.

## The Challenge

Events are immutable, but requirements change. How do we:
- Add new fields?
- Remove deprecated fields?
- Rename events?

## Strategies

### 1. Weak Schema
```typescript
// Always use optional fields
interface OrderPlaced {
  orderId: string;
  items: Item[];
  discountCode?: string; // Added in v2
}
```

### 2. Upcasting
```typescript
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
```

### 3. Event Versioning
```typescript
// Store version with event
{ type: 'OrderPlaced', version: 2, ... }
```

## Tasks

1. Add a new field to an existing event
2. Implement an upcaster for backward compatibility
3. Write tests for both old and new event formats

## Golden Rule

> Never change the meaning of an existing event field. Add new fields instead.
