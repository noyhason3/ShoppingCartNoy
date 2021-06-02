import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from '../../store/actions/user.action';
import backgroundImg from '../../assets/imgs/background.jpg'
import './Homepage.scss';

export const Homepage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <section className='homepage'>

      <div className="main">
        <p className="homepage-title">Shopping Online - All The Best in one place</p>
        <img src={backgroundImg} />
      </div>

    </section>
  );
};
