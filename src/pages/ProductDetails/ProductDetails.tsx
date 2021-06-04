import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { ModalCmp } from '../../cmps/Modal';
import { Product, productService } from '../../services/product.service';
import './ProductDetails.scss'

export const ProductDetails = ({ match }: any) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(true);
  const [currProduct, setCurrProduct] = useState<Partial<Product>>({})
  const history = useHistory()

  useEffect(() => {
    setLoading(true)
    getCurrProduct(match.params.id)
  }, [])

  const getCurrProduct = async (productId: string) => {
    const productRes = await productService.getById(productId)
    setLoading(false)

    setCurrProduct(productRes)
  };
  const handleClose = () => {
    history.goBack()
  };

  return (
    <section className="product-details">
      <ModalCmp handleClose={handleClose} open={open} currProduct={currProduct} loading={loading} />
    </section>
  )
}

