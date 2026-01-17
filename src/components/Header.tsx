import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <Link to="/" className="flex items-center gap-3 w-fit">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-accent text-xl">
            ⚡
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Event Sourcing</h1>
            <p className="text-xs text-muted-foreground">Workshop Exercises</p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
