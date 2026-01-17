# Exercise 5: CQRS - Command Query Separation

## Objective

Implement CQRS to optimize reads and writes independently.

Switch to Branch "exercise-4/cqrs" on both the backend and the frontend ( if you cloned it ).
On this branch, if you start the system, the frontend is reading data directly from the Postgres Projection.

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

We already have a CQRS based architecture in place. In this exercise, we go even further by fully separating
Backend and Frontend. 
On this branch, the Read API for Catalog Items has been removed.

As it´s no longer necessary - the client will connect directly to the Read Only Database.

