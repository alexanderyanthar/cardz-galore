import React, { useContext } from 'react'
import Header from './Header';
import HeroSection from './HeroSection';
import { AuthContext } from '../contexts/AuthContext';
import ImageCarousel from './ImageCarousel';
import image1 from '../assets/promo-banner-placeholder.png';
import image2 from '../assets/promo-banner-placeholder.png';
import image3 from '../assets/promo-banner-placeholder.png';
import image4 from '../assets/promo-banner-placeholder.png';
import FeaturedCardContainer from './FeaturedCardContainer';
import Footer from './Footer';



const Home = () => {

  const images = [
    image1,
    image2,
    image3,
    image4,
  ]
  
  return (
    <>
        <HeroSection />
        <ImageCarousel images={images} />   
        <FeaturedCardContainer /> 
        <Footer />
    </>
  )
}

export default Home