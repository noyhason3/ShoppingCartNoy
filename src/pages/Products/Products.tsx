import { useState, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { ProductList } from '../../cmps/ProductList';
import { loadProducts } from '../../store/actions/product.actions';
import { addProductToCart } from '../../store/actions/user.action';
import { productService } from '../../services/product.service';
import { DropdownMenu } from '../../cmps/DropdownMenu';
import { Product } from '../../services/product.service'
import loader from '../../assets/imgs/loader.svg'
import './Products.scss'

export const Products = () => {
  const [filterBy, setFilterBy] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const products = useSelector((state: RootStateOrAny) => state.productReducer.products);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true)
    dispatch(loadProducts(filterBy));
    loadCategories();
  }, [filterBy]);

  const addToCart = (product: Product, ev: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    ev.preventDefault()
    dispatch(addProductToCart(product));
  };

  const loadCategories = async () => {
    setCategories(await productService.getCategories());
    setLoading(false)
  };

  return (
    <section className="products">
      {loading ? <div className="loader-container">
        <img src={loader} className="loader" />
      </div> : <div className="basic-container products-container">
        <DropdownMenu names={categories} setFilterBy={setFilterBy} />
        <ProductList
          products={products}
          addToCart={addToCart}
        />
      </div>
      }
    </section>
  );
};
