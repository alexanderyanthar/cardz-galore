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
import SearchResultsPage from "./components/SearchResultsPage";



function App() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <AuthProvider>
      <Header searchResults={searchResults} setSearchResults={setSearchResults} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='quantity-adjustment' element={<SearchAndAdjustQuantity />} />
        <Route path="/search-results" element={ <SearchResultsPage searchResults={searchResults} />}>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
