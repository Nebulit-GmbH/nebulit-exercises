# Exercise 1: Getting Started with Event Sourcing

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

```typescript
// Traditional approach
user.balance = 100;

// Event sourcing approach
events.push({ type: 'MoneyDeposited', amount: 100 });
```

> **Note:** Event sourcing is not just about storing events—it's a different way of thinking about your domain.
