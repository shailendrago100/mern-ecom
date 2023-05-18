import React, { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addAProduct } from "../store/auth-actions";
import Navbar from "../layout/Navbar";
const CreatProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((store) => store.auth);

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

  const titleRef = useRef();
  const descriptionRef = useRef();

  const categoryRef = useRef();

  const priceRef = useRef();
  const inStockRef = useRef();
  const formSubmitHandler = (e) => {
    e.preventDefault();
    // const firstname = firstnameRef.current.value;
    // const lastname = lastnameRef.current.value;
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;

    const category = categoryRef.current.value;

    const price = priceRef.current.value;
    const inStock = inStockRef.current.value;

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

    let image = avatar;

    dispatch(
      addAProduct({
        title,
        description,
        image,
        category,
        sizee,
        price,
        inStock,
      })
    );
    history.push("/");
    titleRef.current.value = "";
    descriptionRef.current.value = "";

    categoryRef.current.value = "";

    priceRef.current.value = "";
    inStockRef.current.value = "";
  };
  return (
    <div>
      <div className="px-4 w-full h-screen flex justify-center items-center bg-cp bg-no-repeat bg-cover">
        <form
          onSubmit={formSubmitHandler}
          action=""
          className="border bg-white p-6 flex flex-col items-center min-w-[17rem] sm:min-w-[22rem] md:min-w-[35rem] max-w-[25rem]"
        >
          <h1 className="uppercase text-xl mb-4 font-bold">Create A Product</h1>
          <div>
            <img src={avatarPrev} alt="User" />

            <input
              className="mb-4 bg-teal-700 text-white p-2"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 mb-4">
            <input
              className="block p-2 border-2 rounded focus:outline-none"
              type="text"
              placeholder="title"
              ref={titleRef}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 mb-4">
            <input
              className="block p-2 border-2 rounded focus:outline-none"
              type="text"
              placeholder="description"
              ref={descriptionRef}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 mb-4">
            {/* <input
            className='block p-2 border-2 rounded focus:outline-none'
            type='text'
            placeholder='image'
            ref={imageRef}
          /> */}
            <input
              className="block p-2 border-2 rounded focus:outline-none"
              type="text"
              placeholder="category"
              ref={categoryRef}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 mb-4">
            <input
              className="block p-2 border-2 rounded focus:outline-none"
              type="Number"
              placeholder="Price"
              ref={priceRef}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 mb-4">
            <input
              className="block p-2 border-2 rounded focus:outline-none"
              type="text"
              placeholder="Available in stock or not"
              ref={inStockRef}
            />
          </div>

          <button className="mb-4 bg-teal-700 text-white p-2">Create </button>
          <Link to="/" className="capitalize underline mb-4"></Link>
        </form>
      </div>
    </div>
  );
};

export default CreatProduct;
