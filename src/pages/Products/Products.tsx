import { useState } from 'react';
import { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { ProductList } from '../../cmps/ProductList';
import { loadProducts } from '../../store/actions/product.actions';
import { addProductToCart } from '../../store/actions/user.action';
import './Products.scss';
// import * as React from 'react';
import { productService } from '../../services/product.service';
import { DropdownMenu } from '../../cmps/DropdownMenu';

export const Products = () => {
  const [filterBy, setFilterBy] = useState<any>(null);
  const [categories, setCategories] = useState([]);
  const products = useSelector((state: RootStateOrAny) => state.productReducer.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts(filterBy));
    loadCategories();
  }, [filterBy]);

  const addToCart = (product: { id: string, title: string, description: string, price: number, image: string, category: string }, ev: Event): void => {
    ev.stopPropagation()
    dispatch(addProductToCart(product));
  };

  const loadCategories = async () => {
    setCategories(await productService.getCategories());
  };

  return (
    <section className="basic-container products">
      <DropdownMenu names={categories} setFilterBy={setFilterBy} />
      <ProductList
        products={products}
        addToCart={addToCart}
      />
    </section>
  );
};
