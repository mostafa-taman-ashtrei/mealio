import { Button } from "@/components/ui/button";
import ThemeTogglerButton from "@/components/nav/ThemeToggle";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center min-h-screen">
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        The Joke Tax
      </h3>
      <Button>Get Started </Button>
    </div>
  );
}

export default Home;