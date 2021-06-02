const INITIAL_STATE = {
  currUser: null,
  userCart: null,
};

export function userReducer(state = INITIAL_STATE, action:any) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        currUser: {...action.user},
      };
      // case 'ADD_PRODUCT':
      //   return {
      //     ...state,
      //     cartProducts: [...state.cartProducts, action.product],
      //   };
    case 'SET_USER_CART':
      return {
        ...state,
        userCart: {...action.cart},
      };
    case 'UPDATE_USER_CART':
      return {
        ...state,
        userCart: {...action.cart},
      };
    default:
      return state;
  }
}
