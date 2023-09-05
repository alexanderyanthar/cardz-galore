import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import leftArrow from '../assets/left-arrow.svg';
import rightArrow from '../assets/right-arrow.svg';

const ImageCarousel = ({ images }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-8 mb-4">
      <h2 className='text-3xl mb-4 text-center font-semibold shadow-md rounded p-4 border-2 bg-blue-50'>Check out the latest sets!</h2>
      <Carousel
        className='my-4'
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        infiniteLoop={true}
        showArrows
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title="Previous"
              className="custom-arrow left-10 transform -translate-x-1/2 bottom-1/2 absolute z-10"
            >
              <img src={leftArrow} alt="left arrow icon" />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title="Next"
              className="custom-arrow right-10 transform -translate-x-1/2 bottom-1/2 absolute z-10"
            >
              <img src={rightArrow} alt="right arrow icon" />
            </button>
          )
        }
      >
        {images.map((image, index) => (
          <div className='w-full mx-auto my-0' key={index}>
            <img src={image} alt={`Promotion ${index + 1}`} className="mx-auto object-cover max-w-full" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
