import { storageService } from './storage.service';
import axios from 'axios';
import { Product } from './product.service'
import _ from 'lodash'

const USER_KEY = 'loggedinUser';

const getLoggedinUser = () => gUser;

const createCart = async () => (await axios.post<Cart>('https://fakestoreapi.com/carts', { userId: gUser._id, date: Date.now(), products: _getProductsQuantities(), })).data;

const updateCart = async (cartId: string) => (await axios.put<Cart>(`https://fakestoreapi.com/carts/${cartId}`, { userId: gUser._id, date: Date.now(), products: _getProductsQuantities(), })).data;

const addProduct = (product: Product) => {
  gUser.products.push(product);
  storageService.store(USER_KEY, gUser);
  return gUser;
}

const checkout = () => {
  gUser.products = []
  storageService.store(USER_KEY, gUser);
  return gUser;
}

const _getProductsQuantities = () => {
  const productsMap = _.countBy(gUser.products, (product) => product.id)
  return Object.entries(productsMap).map(([productId, quantity]) => ({ productId, quantity }))
}

const _loadUser = () => {
  let user = storageService.load(USER_KEY);
  if (!user) user = gDefaultUser;
  storageService.store(USER_KEY, user);
  return user;
}

const gUser: User = _loadUser();

export type User = {
  _id: string,
  name: string,
  products: Product[]
}

export type Cart = {
  id: string,
  userId: string,
  date: string,
  products: Product[]
}

const gDefaultUser: User = {
  _id: 'u101',
  name: 'default guest',
  products: [],
};

export const userService = {
  getLoggedinUser,
  addProduct,
  createCart,
  updateCart,
  checkout
};
