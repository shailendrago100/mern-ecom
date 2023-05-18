import React from 'react';
import '../pages/Style.css'
import Categorie from './Categorie';

const Categories = () => {
  return (
    <section className='containCat' id='categories'>
      <div className='grid gap-2 md:grid-cols-3 mb-2'>
        <Categorie
          name='tshirt'
          image='https://res.cloudinary.com/doqgoey64/image/upload/v1683624820/products-estore/tshirt_upwfwa.jpg'
        />
        <Categorie
          name='Shoes'
          image='https://res.cloudinary.com/doqgoey64/image/upload/v1683624429/products-estore/1_vfslhp.jpg'
        />
        <Categorie
          name='jeans'
          image='https://res.cloudinary.com/doqgoey64/image/upload/v1683625077/products-estore/images_qujlv0.jpg'
        />
      </div>
      <div className='grid gap-2 md:grid-cols-2'>
        <Categorie
          name='hoodies'
          image='https://res.cloudinary.com/doqgoey64/image/upload/v1683625218/products-estore/Anti-Village-Black-Hoodie-1_sdzlcd.jpg'
        />
        <Categorie
          name='Others'
          image='https://res.cloudinary.com/doqgoey64/image/upload/v1683625377/products-estore/images_1_nfk6hi.jpg'
        />
      </div>
    </section>
  );
};

export default Categories;