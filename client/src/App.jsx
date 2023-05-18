import React from 'react';
import { BrowserRouter as Routes ,Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from './pages/Home';
import ShoppingCategorie from './pages/ShoppingCategorie';
import SingleProduct from './pages/SingleProduct';
import ShoppingCart from './pages/ShoppingCart';
import Orders from './pages/Orders';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './layout/Navbar';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Team from './../src/components/Team/Team';
import CreatProduct from './pages/CreateProduct';
import UpdateProduct from './pages/UpdateProdcut';
const App = () => {
  const user = useSelector((store) => store.auth.currentUser);
  return (
    <Routes>
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/categories/:category'>
        <ShoppingCategorie />
      </Route>
      <Route path='/products/:id'>
        <SingleProduct />
      </Route>
      <Route path='/cart'>
        <ShoppingCart />
      </Route>
      <Route path='/orders'>
        <Orders />
      </Route>
      {/* <Route path='/login'>{<Login />}</Route> */}
      <Route path='/login'>{user ? <Redirect to='/' /> : <Login />}</Route>
      <Route path='/signup'>{user ? <Redirect to='/' /> : <Signup />}</Route>
      {/* <Route path='/signup'>
        <Signup />
      </Route> */}
      <Route path='/aboutus'>
        <Team />
      </Route>
      <Route path='/addAProduct'>
        <CreatProduct />
      </Route>
      <Route path='/update/:id'>
        <UpdateProduct />
      </Route>
    </Switch>
    </Routes>
  );
};

export default App;
