import { useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import axios from "axios";
import Search from "./components/Search";
import QuantityAdjustmentForm from "./components/backendForms/QuantityAdjustmentForm";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Signup from "./components/backendForms/Signup";
import Home from "./components/Home";
import Login from "./components/backendForms/Login";
import { AuthProvider } from "./contexts/AuthContext";
import SearchAndAdjustQuantity from "./components/backendForms/SearchAndAdjustQuantity";
import SearchResultsPage from "./components/SearchResultsPage";
import CartPage from "./components/CartPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const location = useLocation();


  const shouldRenderHeader = location.pathname !== '/logout-success';

  return (
    <AuthProvider>
      {shouldRenderHeader && (
        <Header searchResults={searchResults} setSearchResults={setSearchResults} />
      )}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='quantity-adjustment' element={<SearchAndAdjustQuantity />} />
        <Route path="/search-results" element={ <SearchResultsPage searchResults={searchResults} setSearchResults={setSearchResults} />} />
        <Route path="/cart-page" element={ <CartPage searchResults={searchResults} setSearchResults={setSearchResults} cartItems={cartItems} setCartItems={setCartItems} /> } />
      </Routes>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
