import About from "./components/About";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Services from "./components/Services";

const Home: React.FC = () => {
  return (
    <div className="py-4">
      <Hero />
      <Services />
      <About />
      <Pricing />
    </div>
  );
};

export default Home;