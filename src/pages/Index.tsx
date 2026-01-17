import { exercises } from '@/data/exercises';
import ExerciseCard from '@/components/ExerciseCard';
import Header from '@/components/Header';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent" />
        <div className="container mx-auto px-4 py-16 text-center relative">
          <div className="mb-6 inline-flex items-center justify-center">
            <span className="text-6xl animate-glow-pulse inline-block">⚡</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Event Sourcing <span className="text-primary">Workshop</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            From Requirements to Slice-based Architecture. Master Event Sourcing principles 
            and build production-ready systems step by step.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="text-primary">✓</span> Hands-On Exercises
            </span>
            <span className="flex items-center gap-2">
              <span className="text-primary">✓</span> Kotlin Examples
            </span>
            <span className="flex items-center gap-2">
              <span className="text-primary">✓</span> Production Patterns
            </span>
          </div>
        </div>
      </section>

      {/* Exercises Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Workshop Exercises</h2>
          <p className="text-muted-foreground">
            Complete each exercise in order to build a solid foundation in event sourcing.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {exercises.map((exercise, index) => (
            <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Built with ❤️ for learning Event Sourcing</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
