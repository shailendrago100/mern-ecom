import React, { useState, useEffect } from "react";

import { Add, Remove } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { publicRequest } from "../request-methods";
import { addProduct } from "../store/cart-slice";

import Navbar from "../layout/Navbar";
import Announcement from "../layout/Announcement";
import Footer from "../layout/Footer";
import Newsletter from "../components/Newsletter";
import { deleteProduct } from "../store/auth-actions";
import { useHistory } from 'react-router-dom';
import { updateProductStart } from "../store/product-slice";
import Navbarr from '../layout/Navbarr';

const SingleProduct = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const user1 = useSelector((store) => store.auth.currentUser);
  const [product, setProduct] = useState({});
  let [quantity, setQuantity] = useState(1);
  let [size, setSize] = useState("S");
  let [loginToAdd, setLoginToAdd] = useState(false);

  // const routeChange = () =>{ 
  //   let path = `/update/${id}`; 
  //   history.push(path);
  // }


  const getProduct = async () => {
    try {
      const url = `/products/${id}`;
      const response = await publicRequest.get(url);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const sizeChangeHandler = (e) => {
    setSize(e.target.value);
  };
  const addToCartHandler = () => {
    dispatch(addProduct({ product, size, quantity }));
  };
  const productHandler = () => {
    let path = `/update/${id}`; 
    history.push(path);
    dispatch(updateProductStart({ product}));
  };
  const toggleLoginToAdd = () => {
    setLoginToAdd(true)
  }
  useEffect(() => {
    getProduct();
  }, []);

  const deleteHandler = async() => {
    console.log(id);
    await dispatch(deleteProduct(id));
    history.push("/");
  }
  return (
    <>
      {/* <Announcement /> */}
      <Navbarr />
      <section className="p-8 grid md:grid-cols-2 gap-8">
        <div className="grow">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grow">
          <h2 className="text-5xl mb-6">{product.title}</h2>
          <p className="mb-6 text-xl">{product.description}</p>
          <span className="block mb-6 text-4xl">₹{product.price}</span>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="" className="text-xl">
                Size
              </label>
              <select onChange={sizeChangeHandler}>
                {product.size?.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center justify-start">
              <span
                className="cursor-pointer"
                onClick={() => {
                  quantity >= 1 && setQuantity(quantity--);
                }}
              >
                <Remove />
              </span>
              <span className="mx-2 text-xl h-10 w-10 rounded-2xl border flex justify-center items-center">
                {quantity}
              </span>
              <span
                className="cursor-pointer"
                onClick={() => {
                  setQuantity(quantity++);
                }}
              >
                <Add />
              </span>
            </div>

            {user1 ? (
              <div>
                <div>
                {user1 ?  user1.user.isAdmin ?  (
          <button
                  onClick={deleteHandler}
                  className="my-2 uppercase hover:bg-teal-700 hover:text-white transition ease-out duration-500 border-teal-700 border rounded p-4">
          Delete Item
        </button>
        )  : (null) : " "}
                </div>


                <div>

                <button
                  onClick={addToCartHandler}
                  className="uppercase hover:bg-teal-700 hover:text-white transition ease-out duration-500 border-teal-700 border rounded p-4"
                >
                  Add to cart
                </button>
                  </div>

                  <div>
                {user1 ?  user1.user.isAdmin ?  (
          <button
                  onClick={ productHandler}
                  className="my-2 uppercase hover:bg-teal-700 hover:text-white transition ease-out duration-500 border-teal-700 border rounded p-4">
          Update {""} Item 
        </button>
        )  : (null) : " "}
                </div>




              </div>
            ) : (
              <div>

                <button
                  onClick={toggleLoginToAdd}
                  className="uppercase hover:bg-teal-700 hover:text-white transition ease-out duration-500 border-teal-700 border rounded p-4"
                  >
                  Add to cart
                </button>
                  {!loginToAdd ? (null) : (<p style={{"color":"red"}}>Please Login !</p>)}
              </div>
            )}
          </div>
        </div>
      </section>
      <Newsletter />
      <Footer />
    </>
  );
};

export default SingleProduct;
