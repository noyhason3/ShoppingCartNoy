import { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadUser } from '../../store/actions/user.action';
import cartIcon from '../../assets/imgs/cart.png'
import './AppHeader.scss';

export const AppHeader = () => {
  const user = useSelector((state: RootStateOrAny) => state.userReducer.currUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <section className='basic-container appHeader'>
      <div className="nav-bar">
        <Link className="link" to='/'>
          Home
      </Link>
        <Link className="link" to='/products'>
          Products
      </Link>
      </div>
      <div className="shopping-cart">
        <Link to='/cart'>
          <img
            className='person-img'
            src={cartIcon}
            alt='cartIcon'
            width="70"
          />
        </Link>
        <p>{user?.products?.length || 0} Items</p>
      </div>
    </section>
  );
};
