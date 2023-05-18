import React, { useEffect, useState } from 'react';

import { publicRequest } from '../request-methods';

import Product from './Product';

import '../pages/Style.css'


const Products = ({ category, filter }) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const url = category ? `/products?category=${category}` : '/products'; //For the Home Page
      const response = await publicRequest.get(url);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
<div>
    <h2 className='homeHeading'>Featured Products</h2>
   
   <div className='container' id='container'>
    <section
      className='contain'
      id='products'
    >
      {console.log(products)}
      {products.map((product) => (
       
        <Product key={product._id} image={product.image} id={product._id} price={product.price}  title =  {product.title}/>
      ))}
    </section>
    </div>
    </div>
  );
 
};

export default Products;
