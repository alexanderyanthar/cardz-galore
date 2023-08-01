import { useEffect, useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import axios from "axios";
import FeaturedCards from "./components/FeaturedCards";

function App() {

  const [featuredCards, setFeaturedCards] = useState([]);

  useEffect(() => {
    axios
      .get("https://db.ygoprodeck.com/api/v7/cardinfo.php")
      .then((res) => {
        const allCards = Object.values(res.data.data).flatMap((array) => array);
        const firstTenCards = allCards.slice(40, 50);
        console.log(firstTenCards);
        setFeaturedCards(firstTenCards);
      })
      .catch(err => {
        console.error("Error fetching featured card data:", err);
      });
  }, []);

  return (
    <>
      <Header />
      <HeroSection />

      <div>
        <h2 className="text-4xl font-bold text-center mt-8">Featured Cards</h2>
        <div className="flex justify-center flex-wrap">
          {featuredCards.map((card) => (
            <FeaturedCards key={card.id} card={card} />
          ))}
        </div>
      </div>
    </>
    
  );
}

export default App;
