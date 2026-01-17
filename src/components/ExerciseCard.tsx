import { Link } from 'react-router-dom';
import type { Exercise } from '@/data/exercises';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
}

const ExerciseCard = ({ exercise, index }: ExerciseCardProps) => {
  return (
    <Link
      to={`/exercise/${exercise.id}`}
      className="group block"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(45_93%_58%/0.15)] animate-fade-in opacity-0">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted text-2xl">
            {exercise.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-primary">
                Exercise {exercise.id}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
              {exercise.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {exercise.description}
            </p>
          </div>
          <div className="text-muted-foreground group-hover:text-primary transition-colors">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ExerciseCard;
