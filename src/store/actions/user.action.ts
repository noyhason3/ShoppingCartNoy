import { userService } from '../../services/user.service';

export function loadUser() {
  return async (dispatch: any) => {
    const user = await userService.getLoggedinUser();
    dispatch({ type: 'SET_USER', user });
  };
}

export function addProductToCart(product: { id: string, title: string, description: string, price: number, image: string, category: string }) {
  return async (dispatch: any) => {
    const user = await userService.addProduct(product);
    dispatch({ type: 'SET_USER', user });
  };
}

export function createUserCart() {
  return async (dispatch: any) => {
    const cart = await userService.createCart();
    dispatch({ type: 'SET_USER_CART', cart });
  };
}

export function updateUserCart(cartId: string) {
  return async (dispatch: any) => {
    const cart = await userService.updateCart(cartId);
    const user = await userService.getLoggedinUser()
    dispatch({ type: 'SET_USER_CART', cart });
    dispatch({ type: 'SET_USER', user });
  };
}

export function userCheckout() {
  return async (dispatch: any) => {
    const user = await userService.checkout();
    dispatch({ type: 'SET_USER', user });
  };
}
