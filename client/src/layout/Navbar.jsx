import React, { useState } from 'react';
import "./DialogBox.css"
import { Avatar, Badge, Button, Dialog, Typography } from '@mui/material';
import { Search, ShoppingCart } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory  } from 'react-router-dom';
import { logout } from '../store/auth-actions';

const Navbar = () => {
  // const isAdmin = useSelector((store)=> store.auth.currentUser.user.isAdmin);
  const user1 = useSelector((store)=> store.auth.currentUser);
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const history = useHistory();

  let totalQuantity = 0;
  cart.products.map((p)=> totalQuantity+=(p.quantity))
  const logoutHandler = async () => {
    dispatch(logout());
    history.push('/');
  };



  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");
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
  const [editToggle, setEditToggle] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("fjadls")
    // await dispatch(updateProfile(name, email, avatar, bio));
    // setEditToggle(false);
    // dispatch(loadUser());
  };

  return (
    <>
    <nav className='grid grid-cols-2 p-4 border-b font-semibold h-18'>
      <h1 className='font-bold text-3xl uppercase flex items-center justify-start px-4 tracking-wider'>
      <Link to='/'>StyleZone</Link>
      </h1>
      <div className='flex justify-end items-center px-4 text-md md:text-lg'>
      {user1 ?  user1.user.isAdmin ?  (
          <Link to='/addAProduct' className='uppercase px-4 py-2' onClick={() => setEditToggle(!editToggle)}>
          Create A Product
        </Link>
        )  : (null) : " "}
        <Link to='/aboutus' className='uppercase px-4 py-2'>
          About Us
        </Link>
        {user1 ? (null) : (
          <Link to='/signup' className='uppercase px-4 py-2'>
          Sign up
        </Link>
        )}
        {
          user1 ? (
          <div onClick={logoutHandler} className='uppercase px-4 py-2' style={{"cursor":"pointer"}}>
          logout
          </div>
        ) : (
          
          <Link to='/login' className='uppercase px-4 py-2'>
            login
          </Link>
        )
        }
        
        {user1 ? (
          <Link to='/cart'>
          <Badge
            badgeContent={totalQuantity}
            color='primary'
            className='cursor-pointer'
          >
            <ShoppingCart />
          </Badge>
        </Link>
        ) : (null)}
        
      </div>
    </nav>

    <Dialog open={editToggle} onClose={() => setEditToggle(!editToggle)}>
        <div className="DialogBox" style={{}}>
          <Typography variant="h6">Add Product</Typography>

          <div className="updateProfile">
            <form className="updateProfileForm" onSubmit={submitHandler}>
              <Avatar
                src={avatarPrev}
                alt="User"
                sx={{ height: "8vmax", width: "8vmax" }}
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <input
                type="text"
                value={name}
                placeholder="Name"
                className="updateProfileInputs"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Description"
                className="updateProfileInputs"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />


              <Button disabled={false} type="submit">
                Add
              </Button>
            </form>
          </div>
        </div>
      </Dialog>

    </>
  );
};

export default Navbar;
