import { useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import axios from "axios";
import Search from "./components/Search";


function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cards/search?q=${encodeURIComponent(query)}`);
      setSearchResults(response.data);
    } catch (err) {
      console.error('Error fetching search results:', err);
    }
  }

  return (
    <>
      <Header />
      <HeroSection />
      <Search onSearch={handleSearch} />

      <div>
        <h2 className="text-4xl font-bold text-center mt-8">Search Results</h2>
        <div className="flex justify-center flex-wrap">
          {searchResults.length > 0 ? (
            searchResults.map((card) => (
              <div key={card.id} className="m-4">
                <img src={card.images} alt={card.name} className='w-48 h-64 object-contain' />
                <h3 className='text-lg font-bold mt-2'>{card.name}</h3>
                <p>Attribute: {card.attribute}</p>
                <p>Level/Rank: {card.level}</p>
                <p>ATK/DEF: {card.atk}/{card.def}</p>
              </div>
            ))
          ) : (
            <p>No search results!</p>
          )}

        </div>
      </div>
    </>
  );
}

export default App;
