import React from 'react';
import { Place, MailOutline, LocalPhone } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className='p-8 grid gap-x-16 gap-y-4 md:grid-cols-2'>
        {/* <div className='flex flex-col'>
          <div className='h-16 w-16 border-solid border-black border-2 rounded-full '></div>
          <div className='flex'>
            
          </div>
        </div> */}
        <div>
        <h1 className='font-bold text-3xl uppercase mb-4 tracking-wider'>
          <a href=''>STYLEZONE</a>
        </h1>
        <p className='text-justify'>
        Welcome to our fashion website, where you can find the latest trends, 
        tips, and inspiration for all things fashion.Fashion is more than just clothes, 
        it's a form of self-expression and a way to showcase your personality.
         Whether you're looking for the perfect outfit for a special occasion or 
         simply want to update your everyday wardrobe, we've got you covered.


        </p>
      </div>
      {/* <div>
        <h2 className='font-bold text-2xl mb-4 tracking-wider'>Useful Links</h2>
        <div className='grid grid-cols-2'>
          <ul>
            <li>
              <a href=''>Home</a>
            </li>
            <li>
              <a href=''>About Us</a>
            </li>
            <li>
              <a href=''>Cart</a>
            </li>
            <li>
              <a href=''>Terms</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href=''>Cart</a>
            </li>
            <li>
              <a href=''>My Account</a>
            </li>
            <li>
              <a href=''>Wishlist</a>
            </li>
            <li>
              <a href=''>Terms</a>
            </li>
          </ul>
        </div>
      </div> */}
      
      <div>
        <h2 className='font-bold text-2xl mb-4 tracking-wider'>Contact</h2>
        <ul>
          <li>
            <Place className='mr-4' />
            <span>Kurukshetra, Haryana</span>
          </li>
          <li>
            <LocalPhone className='mr-4' />
            <span>+91 123465789</span>
          </li>
          <li>
            <MailOutline className='mr-4' />
            <span>contact@stylezone.com</span>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
