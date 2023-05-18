import React, { useState } from 'react';
import '../pages/Style.css'
import { Link } from 'react-router-dom';

const Product = ({ image, id , price ,title }) => {
 

  const [overlayIsShown, setOverlayIsShown] = useState(false);
  return (
    <figure
      className='prodDetails'
      onMouseEnter={() => {
        setOverlayIsShown(true);
      }}
      onMouseLeave={() => {
        setOverlayIsShown(false);
      }}
    >
      <img src={image} alt='' className='w- h-full object-cover' />
      {overlayIsShown && (
        <Link
          to={`/products/${id}`}
          className='cursor-pointer absolute top-0 left-0 w-full h-full bg-black/1 flex justify-center items-center'
        ></Link>
      )}
      <p>{title}</p>
      <span>{`₹${price}`}</span>
    </figure>
  );
};

export default Product;
