import { useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import axios from "axios";
import Search from "./components/Search";
import QuantityAdjustmentForm from "./components/backendForms/QuantityAdjustmentForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/backendForms/Signup";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Login from "./components/backendForms/Login";
import { AuthProvider } from "./contexts/AuthContext";
import SearchAndAdjustQuantity from "./components/backendForms/SearchAndAdjustQuantity";



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
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='quantity-adjustment' element={<SearchAndAdjustQuantity />} />
      </Routes>

      {/* <div>
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
      </div> */}
    </AuthProvider>
  );
}

export default App;
