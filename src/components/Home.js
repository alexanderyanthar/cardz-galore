import React, { useContext } from 'react'
import Header from './Header';
import HeroSection from './HeroSection';
import { AuthContext } from '../contexts/AuthContext';
import ImageCarousel from './ImageCarousel';
import image1 from '../assets/yugioh-sbv-promo-image.jpg';
import image2 from '../assets/yugioh-dn-promo-image.jpg';
import image3 from '../assets/yugioh-mom-promo-image.jpg';
import image4 from '../assets/yugioh-ws-promo-image.jpg';
import FeaturedCardContainer from './FeaturedCardContainer';



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
    </>
  )
}

export default Home