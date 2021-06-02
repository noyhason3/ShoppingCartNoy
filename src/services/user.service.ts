import { storageService } from './storage.service';
import axios from 'axios';

export const userService = {
  getLoggedinUser,
  addProduct,
  createCart,
  updateCart,
  checkout,
};

const USER_KEY = 'loggedinUser';

const gDefaultUser = {
  _id: 'u101',
  name: 'default guest',
  products: [],
};
const gUser = _loadUser();

function getLoggedinUser() {
  return gUser;
}

async function createCart() {
  const user = _loadUser();
  const res = await axios.post(
    'https://fakestoreapi.com/carts',
    JSON.stringify({
      userId: user._id,
      date: Date.now(),
      products: _getProductsQuantities(),
    })
  );
  const data = JSON.parse(res.config.data);
  data.id = res.data.id;
  return data;
}

async function updateCart(cartId: string) {
  const user = _loadUser();
  const res = await axios.put(
    `https://fakestoreapi.com/carts/${cartId}`,
    JSON.stringify({
      userId: user._id,
      date: Date.now(),
      products: _getProductsQuantities(),
    })
  );
  const data = JSON.parse(res.config.data);
  data.id = res.data.id;
  return data;
}

function addProduct(product: { title: string, price: number, description: string, image: string, id: string }) {
  gUser.products.push(product);
  storageService.store(USER_KEY, gUser);
  console.log('user', gUser);
  return gUser;
}

function checkout() {
  gUser.products = []
  const user = storageService.store(USER_KEY, gUser);
  return user;
}

function _getProductsQuantities() {
  const user = _loadUser();
  const productsMap = user.products.reduce((acc: any, product: { id: string, title: string, description: string, price: number, image: string, category: string }) => {
    if (!acc[product.id]) acc[product.id] = 0;
    acc[product.id]++;
    return acc;
  }, {});

  const productMapToArray = Object.entries(productsMap);
  const cartProducts = productMapToArray.map((item) => {
    return { productId: item[0], quantity: item[1] };
  });
  return cartProducts;
}

function _loadUser() {
  let user = storageService.load(USER_KEY);
  if (!user) user = gDefaultUser;
  storageService.store(USER_KEY, user);
  return user;
}
