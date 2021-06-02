import { productService } from '../../services/product.service';

export function loadProducts(filterBy:string) {
  return async (dispatch:any) => {
    const products = await productService.query(filterBy);
    dispatch({ type: 'SET_PRODUCTS', products });
  };
}

export function getProductById(productId:string) {
  return async (dispatch:any) => {
    const product = await productService.getById(productId);
    return product;
  };
}

// export function saveProduct(product){
//     return async (dispatch)=>{
//         const isAdd = !product._id
//         const updatedProduct = await productService.saveProduct(product)
//         if (isAdd) dispatch({type:'ADD_PRODUCT', product: updatedProduct})
//         else dispatch({type:'UPDATE_PRODUCT', updatedProduct})
//     }
// }


// export function removeProduct(productId) {
//   return async (dispatch) => {
//     await productService.deleteProduct(productId);
//     dispatch({ type: 'REMOVE_PRODUCT', productId });
//   };
// }


// export function getCategories() {
//   return async (dispatch) => {
//     const categories = await productService.getProductCategories();
//     // dispatch({ type: 'SET_PRODUCT', product });
//     return categories;
//   };
// }