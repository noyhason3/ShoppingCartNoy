import { Cart, User } from "../../services/user.service";

const INITIAL_STATE: {
  currUser: User | null,
  userCart: Cart | null,
} = {
  currUser: null,
  userCart: null,
}

export const userReducer = (state = INITIAL_STATE, action: { type: string, user?: User, cart?: Cart }) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        currUser: { ...action.user },
      };
    case 'SET_USER_CART':
      return {
        ...state,
        userCart: { ...action.cart },
      };
    case 'UPDATE_USER_CART':
      return {
        ...state,
        userCart: { ...action.cart },
      };
    default:
      return state;
  }
}
