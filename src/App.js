// import logo from './logo.svg';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { Homepage } from './pages/Homepage';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { ShoppingCart } from './pages/ShoppingCart';
import {AppHeader} from './cmps/AppHeader'

export function App() {
  return (
    <Router>
      <div className='App basic-container'>
      <AppHeader />
        <Switch>
        {/* <PrivateRoute component={ProductEdit} user={userService.getLoggedinUser()} path='/product/edit/:id?' /> */}
        {/* <Route component={ProductEdit} path='/product/edit/:id?' /> */}
        {/* <Route component={ProductDetails} path='/product/:id' /> */}
        <Route component={Products} path='/products' />
        <Route component={ShoppingCart} path='/cart' />
        <Route component={Homepage} path='/' />
        </Switch>
      </div>
    </Router>
  );
}

