import { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { ProductList } from '../../cmps/ProductList';
import {
  createUserCart,
  updateUserCart,
  userCheckout,
} from '../../store/actions/user.action';
import Button from '@material-ui/core/Button';

import './ShoppingCart.scss';
import { useHistory } from 'react-router';
import Modal from '@material-ui/core/Modal';

import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

export const ShoppingCart = () => {
  const user = useSelector((state: RootStateOrAny) => state.userReducer.currUser);
  const cart = useSelector((state: RootStateOrAny) => state.userReducer.userCart);
  const products = useSelector((state: RootStateOrAny) => state.userReducer.currUser?.products);
  const [totalPrice, setTotalPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!cart) {
      dispatch(createUserCart());
    } else {
      dispatch(updateUserCart(cart.id));
    }
  }, []);

  const checkout = () => {
    const sum = calcTotalPrice();
    setTotalPrice(sum);
    dispatch(userCheckout());
    handleOpen();
  };

  const calcTotalPrice = () => {
    const sum = user?.products?.reduce((acc: number, product: { price: number }) => {
      return (acc += product.price)
    }, 0);
    return sum;
  };

  const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

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
          Back
        </Button>
      </div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id='transition-modal-title'>Congrats!</h2>
            <pre id='transition-modal-description'>
              You've checked out successfully!
              Hope to see you again.
              Total: ${totalPrice || 0}
            </pre>
          </div>
        </Fade>
      </Modal>
      <h1>Your Shopping Cart</h1>
      <ProductList products={products} />
    </section>
  );
};
