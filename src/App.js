import Header from "./components/Header";
import HeroSection from "./components/HeroSection";

function App() {
  return (
    <>
      <Header />
      <HeroSection />

      <body>
        {/* featured cards */}
        <h2 className="text-4xl font-bold text-center mt-8">Featured Cards</h2>
        {/* add cards dynamically either through database or through api.
        just make sure they're cards that you actually own right now */}
      </body>
    </>
    
  );
}

export default App;
