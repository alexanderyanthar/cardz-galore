import React from 'react'
import Header from './Header';
import HeroSection from './HeroSection';
import Search from './Search';
import SearchAndAdjustQuantity from './backendForms/SearchAndAdjustQuantity';

const Home = () => {
  return (
    <>
        <Header />
        <HeroSection />
        <Search />
    </>
  )
}

export default Home