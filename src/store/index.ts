import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { productReducer } from './reducers/product.reducer';
import { userReducer } from './reducers/user.reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  productReducer,
  userReducer
})

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk))
);
