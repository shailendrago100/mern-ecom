import React, { useRef } from 'react';

import { Link } from 'react-router-dom';
import { register } from '../store/auth-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((store) => store.auth);
  // const firstnameRef = useRef();
  // const lastnameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const formSubmitHandler = (e) => {
    e.preventDefault();
    // const firstname = firstnameRef.current.value;
    // const lastname = lastnameRef.current.value;
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;
    if (!password.trim() || !username.trim()) return;
    dispatch(register({username, email, password, passwordConfirm}));
   
    // history.push("/");
    // firstnameRef.current.value='';
    // lastnameRef.current.value='';
    usernameRef.current.value='';
    emailRef.current.value='';
    passwordRef.current.value='';
    passwordConfirmRef.current.value='';
  };
  useEffect(()=>{
    if(auth.error){
      history.push("/signup");
    }
    else {
      history.push("/");
    }

  } , [history])



  return (
    <div className='px-4 w-full h-screen flex justify-center items-center bg-login bg-no-repeat bg-cover'>
      <form
        onSubmit={formSubmitHandler}
        action=''
        className='border bg-white p-6 flex flex-col items-center min-w-[17rem] sm:min-w-[22rem] md:min-w-[35rem] max-w-[25rem]'
      > 
        
        <h1 className='uppercase text-xl mb-4 font-bold'>Sign up</h1>
        {/* <div className='grid gap-4 md:grid-cols-2 mb-4'>
          <input
            className='block p-2 border-2 rounded focus:outline-none'
            type='text'
            placeholder='First Name'
            ref={firstnameRef}
          />
          <input
            className='block p-2 border-2 rounded focus:outline-none'
            type='text'
            placeholder='Last Name'
            ref={lastnameRef}
          />
        </div> */}
        <div className='grid gap-4 md:grid-cols-2 mb-4'>
          <input
            className='block p-2 border-2 rounded focus:outline-none'
            type='text'
            placeholder='Username'
            ref={usernameRef}
          />
          <input
            className='block p-2 border-2 rounded focus:outline-none'
            type='text'
            placeholder='Email'
            ref={emailRef}
          />
        </div>
        <div className='grid gap-4 md:grid-cols-2 mb-4'>
          <input
            className='block p-2 border-2 rounded focus:outline-none'
            type='password'
            placeholder='Password'
            ref={passwordRef}
          />
          <input
            className='block p-2 border-2 rounded focus:outline-none'
            type='password'
            placeholder='Confirm Password'
            ref={passwordConfirmRef}
          />
        </div>

        <p className='mb-4 '>
          By Creating an accounct I consent to the processing of my personal
          data in accordance with the &nbsp;
          <a href='' className='uppercase font-bold'>
            Privacy policy
          </a>
          
        </p>
        <button className='mb-4 bg-teal-700 text-white p-2'>Create</button>
        <Link to='/login' className='capitalize underline mb-4'>
          Already have an account
        </Link>
      </form>
    </div>
  );
};

export default Signup;
