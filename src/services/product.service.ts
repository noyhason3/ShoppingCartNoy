import axios from 'axios';

const query = async () => (await axios.get<Product[]>('https://fakestoreapi.com/products')).data;

const queryByCategory = async (filterBy: string) => (await axios.get<Product[]>(`https://fakestoreapi.com/products/category/${filterBy}`)).data;

const getCategories = async () => (await axios.get<string[]>('https://fakestoreapi.com/products/categories')).data;

const getById = async (productId: string) => (await axios.get<Product>(`https://fakestoreapi.com/products/${productId}`)).data;

export type Product = { id: string, title: string, description: string, price: number, image: string, category: string }

export const productService = {
  query,
  queryByCategory,
  getById,
  getCategories,
};
