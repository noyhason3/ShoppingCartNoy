import { Cart, userService } from '../../services/user.service';
import { Product } from '../../services/product.service'
import { User } from '../../services/user.service'
import { Dispatch } from 'react';

export type UserDispatch = Dispatch<{
  type: string,
  user: User
}>

export type CartDispatch = Dispatch<{
  type: string,
  cart: Cart
}>

export const loadUser = () => {
  return async (dispatch: UserDispatch) => {
    const user: User = await userService.getLoggedinUser();
    dispatch({ type: 'SET_USER', user });
  };
}

export const addProductToCart = (product: Product) => {
  return async (dispatch: UserDispatch) => {
    const user: User = await userService.addProduct(product);
    dispatch({ type: 'SET_USER', user });
  };
}

export const createUserCart = () => {
  return async (dispatch: CartDispatch) => {
    const cart = await userService.createCart();
    dispatch({ type: 'SET_USER_CART', cart });
  };
}

export const updateUserCart = (cartId: string) => {
  return async (dispatch: CartDispatch & UserDispatch) => {
    const cart = await userService.updateCart(cartId);
    const user: User = await userService.getLoggedinUser()
    dispatch({ type: 'SET_USER_CART', cart });
    dispatch({ type: 'SET_USER', user });
  };
}

export const userCheckout = () => {
  return async (dispatch: UserDispatch) => {
    const user = await userService.checkout();
    dispatch({ type: 'SET_USER', user });
  };
}
