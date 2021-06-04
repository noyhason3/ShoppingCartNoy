import { Product } from '../../services/product.service'

const INITIAL_STATE: {
  products: Product[],
  currProduct: Product | null,
} = {
  products: [],
  currProduct: null,
};

export const productReducer = (state = INITIAL_STATE, action: { type: string, product?: Product, products?: Product[] }) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.products,
      };
    case 'SET_PRODUCT':
      return {
        ...state,
        currProduct: action.product,
      };
    default:
      return state;
  }
}
