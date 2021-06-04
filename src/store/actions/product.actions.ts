import { Dispatch } from 'react';
import { Product, productService } from '../../services/product.service';

export type productDispatch = Dispatch<{
  type: string,
  product: Product
}>
export type productsDispatch = Dispatch<{
  type: string,
  products: Product[]
}>

export const loadProducts = (filterBy: string = '') => {
  return async (dispatch: productsDispatch) => {
    const products = filterBy
      ?
      await productService.queryByCategory(filterBy)
      :
      await productService.query();
    dispatch({ type: 'SET_PRODUCTS', products });
  };
}

export const getProductById = (productId: string) => {
  return async (dispatch: productDispatch) => {
    const product = await productService.getById(productId);
    dispatch({ type: 'SET_PRODUCT', product });
    return product;
  };
}