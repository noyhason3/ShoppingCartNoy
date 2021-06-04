import { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { ProductList } from '../../cmps/ProductList';
import { createUserCart, updateUserCart, userCheckout } from '../../store/actions/user.action';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
import { ModalCmp } from '../../cmps/Modal';
import './ShoppingCart.scss';
import _ from 'lodash'

export const ShoppingCart = () => {
  const user = useSelector((state: RootStateOrAny) => state.userReducer.currUser);
  const cart = useSelector((state: RootStateOrAny) => state.userReducer.userCart);
  const products = useSelector((state: RootStateOrAny) => state.userReducer.currUser?.products);
  const [totalPrice, setTotalPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cart) {
      dispatch(createUserCart());
    } else {
      dispatch(updateUserCart(cart.id));
    }
  }, []);

  const checkout = () => {
    setTotalPrice(calcTotalPrice());
    dispatch(userCheckout());
    handleOpen();
  };

  const calcTotalPrice = () => _.sumBy(user?.products, ({ price }: { price: number }) => price);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <section className='shopping-cart'>
      <div className="cart-page-btns">
        <Button variant='contained' color='primary' onClick={() => checkout()}>
          Checkout!
        </Button>
        <Button
          color='primary'
          onClick={() => history.push('/products')}
        >
          ⬅ Back
        </Button>
      </div>
      <ModalCmp handleClose={handleClose} open={open} totalPrice={totalPrice} />
      <h1>Your Shopping Cart</h1>
      <ProductList products={products} />
    </section>
  );
};
