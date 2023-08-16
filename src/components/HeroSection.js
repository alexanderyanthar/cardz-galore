import yugiohPromotion from "../assets/yugioh-banner2.webp";
import yugiohPromotion2 from "../assets/yugioh-banner-3.webp";

const HeroSection = () => {
  return (
    <>
    <div className="h-48">
      <img className="h-full object-fit w-screen border-2 border-black" src={yugiohPromotion2} alt="" />
    </div>
      <div className="h-full flex flex-col justify-center items-center text-2xl w-11/12 max-w-screen-xl mx-auto my-0">
        <h1 className="h-1/2 my-3">Welcome to Cardz Galore, your one-stop destination for trading cards in Canada! Browse, buy, and sell a wide range of collectible cards, from Pokemon and Magic: The Gathering to Yu-Gi-Oh! and more.</h1>
      </div>
    </>
  )
}

export default HeroSection