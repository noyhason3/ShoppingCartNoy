import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import { Products } from './pages/Products';
import { ShoppingCart } from './pages/ShoppingCart';
import { AppHeader } from './cmps/AppHeader'
import './App.css';

export const App = () => {
  return (
    <Router>
      <div className='App basic-container'>
        <AppHeader />
        <Switch>
          <Route component={Products} path='/products' />
          <Route component={ShoppingCart} path='/cart' />
          <Route component={Homepage} path='/' />
        </Switch>
      </div>
    </Router>
  );
}

