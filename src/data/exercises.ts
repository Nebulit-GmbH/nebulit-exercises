import exercise00 from '@/content/exercises/01-getting-started.md?raw';
import exercise01 from '@/content/exercises/02-build-your-first-slice.md?raw';
import exercise02 from '@/content/exercises/03-rebuilding-state-from-events.md?raw';
import exercise03 from '@/content/exercises/04-eventual-consistency.md?raw';
import exercise04 from '@/content/exercises/05-cqrs.md?raw';
import exercise05 from '@/content/exercises/06-todo-lists.md?raw';
import exercise06 from '@/content/exercises/07-todo-lists-event-processing.md?raw';
import exercise07 from '@/content/exercises/08-replaying.md?raw';
import exercise08 from '@/content/exercises/09-metadata.md?raw';
import exercise09 from '@/content/exercises/10-gdpr.md?raw';

export interface Exercise {
  id: number;
  title: string;
  emoji: string;
  description: string;
  content: string;
}

export const exercises: Exercise[] = [
  {
    id: 0,
    title: "Getting Started",
    emoji: "🚀",
    description: "Clone all necessary Repositories and start the Applications",
    content: exercise00,
  },
  {
    id: 1,
    title: "Build your first Slice",
    emoji: "✨",
    description: "Implement a State Change Slice",
    content: exercise01,
  },
  {
    id: 2,
    title: "Rebuilding State from Events",
    emoji: "💾",
    description: "Implement the state view slice for catalog items.",
    content: exercise02,
  },
  {
    id: 3,
    title: "Eventual Consistency",
    emoji: "🏗️",
    description: "Learn how to handle Eventual Consistency",
    content: exercise03,
  },
  {
    id: 4,
    title: "CQRS: Command Query Separation",
    emoji: "⚡",
    description: "Separate your read and write models for scalability.",
    content: exercise04,
  },
  {
    id: 5,
    title: "TODO Lists",
    emoji: "✅",
    description: "Build a simple TODO List",
    content: exercise05,
  },
  {
    id: 6,
    title: "TODO Lists as Event Processors",
    emoji: "⚙️",
    description: "Build a simple TODO List as Event Processor",
    content: exercise06,
  },
  {
    id: 7,
    title: "Replaying Events",
    emoji: "⏪",
    description: "Learn how to safely replay events",
    content: exercise07,
  },
  {
    id: 8,
    title: "Meta Data",
    emoji: "🏷️",
    description: "Learn how to handle Meta Data",
    content: exercise08,
  },
    {
        id: 9,
        title: "GDPR",
        emoji: "🏷️",
        description: "See Crypto Shredding in action",
        content: exercise09,
    }
];
