const INITIAL_STATE = {
  products: [],
  // cartProducts: [],
  currProduct: null,
};

export function productReducer(state = INITIAL_STATE, action:any) {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.products,
      };
    // case 'ADD_PRODUCT':
    //   return {
    //     ...state,
    //     cartProducts: [...state.cartProducts, action.product],
    //   };
    // case 'CLEAR_CART':
    //   return {
    //     ...state,
    //     cartProducts: [],
    //   };
      
    // case 'SET_PRODUCT':
    //   return {
    //     ...state,
    //     currProduct: action.product,
    //   };
    // case 'ADD_PRODUCT':
    //   return {
    //     ...state,
    //     products: [...state.products, action.product],
    //   };
    // case 'REMOVE_PRODUCT':
    //   return {
    //     ...state,
    //     products: state.products.filter(
    //       (product) => product._id !== action.productId
    //     ),
    //   };
    // case 'UPDATE_PRODUCT':
    //   const updatedProduct = action.updatedProduct;
    //   return {
    //     ...state,
    //     product: state.products.map((product) =>
    //       product._id === action.updatedProduct._id ? updatedProduct : product
    //     ),
    // };
    default:
      return state;
  }
}
