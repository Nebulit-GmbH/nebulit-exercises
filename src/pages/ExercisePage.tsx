import { useParams, Link, useNavigate } from 'react-router-dom';
import { exercises } from '@/data/exercises';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import Header from '@/components/Header';

const ExercisePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const exerciseId = parseInt(id || '1', 10);
  const exercise = exercises.find((e) => e.id === exerciseId);
  
  const prevExercise = exercises.find((e) => e.id === exerciseId - 1);
  const nextExercise = exercises.find((e) => e.id === exerciseId + 1);

  if (!exercise) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Exercise Not Found</h1>
          <Link to="/" className="text-primary hover:underline">
            Back to exercises
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Exercises
          </Link>
        </nav>

        {/* Exercise header */}
        <div className="mb-8 pb-8 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{exercise.emoji}</span>
            <span className="text-sm font-medium text-primary px-3 py-1 rounded-full bg-primary/10">
              Exercise {exercise.id} of {exercises.length}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">{exercise.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{exercise.description}</p>
        </div>

        {/* Markdown content */}
        <article className="prose-invert">
          <MarkdownRenderer content={exercise.content} />
        </article>

        {/* Navigation */}
        <nav className="mt-12 pt-8 border-t border-border flex items-center justify-between gap-4">
          {prevExercise ? (
            <button
              onClick={() => navigate(`/exercise/${prevExercise.id}`)}
              className="flex items-center gap-3 text-left group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border group-hover:border-primary/50 transition-colors">
                <svg className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Previous</span>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {prevExercise.title}
                </p>
              </div>
            </button>
          ) : (
            <div />
          )}

          {nextExercise ? (
            <button
              onClick={() => navigate(`/exercise/${nextExercise.id}`)}
              className="flex items-center gap-3 text-right group"
            >
              <div>
                <span className="text-xs text-muted-foreground">Next</span>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {nextExercise.title}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border group-hover:border-primary/50 transition-colors">
                <svg className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ) : (
            <Link
              to="/"
              className="flex items-center gap-3 text-right group"
            >
              <div>
                <span className="text-xs text-muted-foreground">Completed!</span>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  Back to Overview
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border group-hover:border-primary/50 transition-colors">
                <svg className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          )}
        </nav>
      </main>
    </div>
  );
};

export default ExercisePage;
