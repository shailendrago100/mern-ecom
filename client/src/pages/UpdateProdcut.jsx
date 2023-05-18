import React, { useRef } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateProduct } from '../store/auth-actions';
import { useParams } from 'react-router-dom';

const UpdateProduct = () => {

  const dispatch = useDispatch();
  const {id} = useParams();
  const history = useHistory();
  const auth = useSelector((store) => store.auth);
  

  const [avatarPrev, setAvatarPrev] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatarPrev(Reader.result);

        setAvatar(Reader.result);
      }
    };
  };
const product = useSelector((state) => state.prod.product.product)
  
const [avatar, setAvatar] = useState(product.image);



  const [title , setTitle] = useState(product.title)
  const [description , setDescription] = useState(product.description);

  const [category , setCategory] = useState(product.category);

  const [price, setPrice] = useState(product.price)
  const [inStock , setInStock] = useState(product.inStock);
  const formSubmitHandler = (e) => {

    let sizee = [];
    if (category == "tshirts") {
      sizee = ["XS", "S", "M", "L", "XL", "XXL"];
    } else if (category == "shoes") {
      sizee = [7, 8, 9, 10, 11, 12];
    } else if (category == "pants") {
      sizee = [30, 32, 34, 36, 38, 40, 42, 44];
    } else if (category == "shirts") {
    sizee = ["XS", "S", "M", "L", "XL", "XXL"];
    }


let image = avatar

   
    dispatch(updateProduct({id, title , description , image , category , sizee  , price , inStock}));
    history.push("/");
    
  };
  return (

    <div>

     

    <div className='px-4 w-full h-screen flex justify-center items-center bg-cp bg-no-repeat bg-cover'>
     
      <form
        onSubmit={formSubmitHandler}
        action=''
        className='border bg-white p-6 flex flex-col items-center min-w-[17rem] sm:min-w-[22rem] md:min-w-[35rem] max-w-[25rem]'
      >
        <h1 className='uppercase text-xl mb-4 font-bold'>Update Product</h1>
          <div>
          <img
                src={avatarPrev}
                alt="User"
                value={avatar}
              />

              <input 
               className='mb-4 bg-teal-700 text-white p-2'
                type="file"
                accept="image/*"
                
                onChange={handleImageChange}
              
              />



          </div>



        <div className='grid gap-4 md:grid-cols-2 mb-4'>
          <input
            className='block p-2 border-2 rounded focus:outline-none'
            type='text'
            placeholder='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}

          />
         
        </div>
        <div className='grid gap-4 md:grid-cols-2 mb-4'>
         
          <input
            className='block p-2 border-2 rounded focus:outline-none'
            type='text'
            placeholder='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
           
          />
        </div>
        <div className='grid gap-4 md:grid-cols-2 mb-4'>
        
          <input
            className='block p-2 border-2 rounded focus:outline-none'
            type='text'
            placeholder='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          
          />
        </div>
        
        <div className='grid gap-4 md:grid-cols-2 mb-4'>
          <input
            className='block p-2 border-2 rounded focus:outline-none'
            type='Number'
            placeholder='Price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
         
          />
          
        </div>

        <div className='grid gap-4 md:grid-cols-2 mb-4'>
         
          <input
            className='block p-2 border-2 rounded focus:outline-none'
            type='text'
            placeholder='Available in stock or not'
            value={inStock}
            onChange={(e) => setInStock(e.target.value)}
           
          />
        </div>

       
        <button className='mb-4 bg-teal-700 text-white p-2'> Submit </button>
        <Link to='/' className='capitalize underline mb-4'>
          
        </Link>
      </form>
    </div>
    </div>
  );
};

export default UpdateProduct;
