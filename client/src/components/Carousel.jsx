import React, { useEffect, useState } from "react";

import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { Link } from "react-scroll";

const CAROUSEL_DATA = [
  {
    url: "https://res.cloudinary.com/diyixgmes/image/upload/v1682525096/young-courier-correcting-cap-against-grey-wall_uj94f9.jpg",
  },
  {
    url: "https://res.cloudinary.com/diyixgmes/image/upload/v1682525089/mixed-race-black-woman-with-curly-hair-natural-warm-makeup-dark-skin-have-fun-stick-out-her-tongue_bgri6k.jpg",
  },
];



const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const incrementIndex = () => {
    setCurrentIndex((currentIndex) => {
      return (currentIndex + 1) % CAROUSEL_DATA.length;
    });
  };
  const decrementIndex = () => {
    setCurrentIndex((currentIndex) => {
      return currentIndex === 0 ? CAROUSEL_DATA.length - 1 : currentIndex - 1;
    });
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % CAROUSEL_DATA.length);
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);
  
  return (
    <section className="h-carousel relative bg-red-300" style={{ "height": "95vh" }}>
      <div
        onClick={decrementIndex}
        className="w-12 h-12 rounded-full bg-gray-100/50 absolute top-1/2 left-4 cursor-pointer"
        style={{"z-index":"999"}}
      >
        <ArrowLeft className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
      </div>
      <img
        src={CAROUSEL_DATA[currentIndex].url}
        className="w-full h-full object-cover"
      />
      <div className="absolute h-full w-full top-0 left-0 bg-black/30"></div>
      <div className="absolute h-full w-full top-0 left-0 flex flex-col justify-center items-center text-white uppercase px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">summer sale</h1>
        <p className="tracking-wider mb-16 text-md md:text-xl">
          don't compromise on style! get flat 30% off for new arrivals.
        </p>
        <Link
          to="categories"
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
        >
          <button className="border p-3 bg-white text-black text-lg hover:bg-teal-600 hover:border-none hover:text-white transition ease-out	duration-500">
            Shop Now <ArrowRight />
          </button>
        </Link>
      </div>
      <div
        onClick={incrementIndex}
        className="w-12 h-12 rounded-full bg-gray-100/50 absolute top-1/2 right-4 cursor-pointer"
      >
        <ArrowRight className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
      </div>
    </section>
  );
};

export default Carousel;
