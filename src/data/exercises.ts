import exercise01 from '@/content/exercises/01-getting-started.md?raw';
import exercise02 from '@/content/exercises/02-designing-events.md?raw';
import exercise03 from '@/content/exercises/03-event-store.md?raw';
import exercise04 from '@/content/exercises/04-aggregates.md?raw';
import exercise05 from '@/content/exercises/05-rebuilding-state.md?raw';
import exercise06 from '@/content/exercises/06-cqrs.md?raw';
import exercise07 from '@/content/exercises/07-projections.md?raw';
import exercise08 from '@/content/exercises/08-versioning.md?raw';
import exercise09 from '@/content/exercises/09-testing.md?raw';
import exercise10 from '@/content/exercises/10-production.md?raw';

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
    content: exercise01,
  },
  {
    id: 2,
    title: "Designing Your First Event",
    emoji: "✨",
    description: "Create well-structured domain events with proper naming.",
    content: exercise02,
  },
  {
    id: 3,
    title: "Building an Event Store",
    emoji: "💾",
    description: "Implement a simple in-memory event store.",
    content: exercise03,
  },
  {
    id: 4,
    title: "Aggregates and Event Handlers",
    emoji: "🏗️",
    description: "Learn how aggregates process commands and emit events.",
    content: exercise04,
  },
  {
    id: 5,
    title: "Rebuilding State from Events",
    emoji: "🔄",
    description: "Reconstruct aggregate state by replaying events.",
    content: exercise05,
  },
  {
    id: 6,
    title: "CQRS: Command Query Separation",
    emoji: "⚡",
    description: "Separate your read and write models for scalability.",
    content: exercise06,
  },
  {
    id: 7,
    title: "Building Projections",
    emoji: "📊",
    description: "Create read models by projecting events.",
    content: exercise07,
  },
  {
    id: 8,
    title: "Event Versioning & Evolution",
    emoji: "📜",
    description: "Handle schema changes in your events over time.",
    content: exercise08,
  },
  {
    id: 9,
    title: "Testing Event-Sourced Systems",
    emoji: "🧪",
    description: "Write effective tests for your event-sourced application.",
    content: exercise09,
  },
  {
    id: 10,
    title: "Production Considerations",
    emoji: "🚀",
    description: "Prepare your event-sourced system for production.",
    content: exercise10,
  },
];
