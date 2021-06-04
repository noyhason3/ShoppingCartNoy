import { Button, TableCell, TableRow } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Product } from '../../services/product.service';
import React from 'react';
import './ProductPreview.scss';

export const ProductPreview = ({ product, addToCart, }: { product: Product, addToCart?: (product: Product, ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void }) => {
  const useStyles = makeStyles(() =>
    createStyles({
      button: {
        backgroundColor: '#1da1f2',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px #C9DBFF',
        color: 'white',
        height: '48px',
        padding: '0 30px',
        '&:hover': {
          backgroundColor: '#1a91da',
        },
        marginLeft: '40px',
      },
      tableRow: {
        display: 'flex',
        justifyContent: 'center',
        cursor: 'pointer'
      },
      cell: {
        width: '33%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem'
      },
      titleCell: {
        display: 'flex',
        alignItems: 'center',
        width: '34%',
        paddingLeft: '40px',
        fontSize: '1rem'
      },
      productImg: {
        width: '80px',
      },
      addCell: {
        display: 'flex',
        alignItems: 'center',
        width: '33%',
      },
    }),
  );
  const classes = useStyles();

  return (
    <section className='product-preview'>
      <TableRow
        hover
        className={classes.tableRow}
        tabIndex={-1}
        key={product.title}
      >
        <TableCell className={classes.titleCell} align='left'>
          {product.title}
        </TableCell>
        <TableCell className={classes.cell} align='left'>
          ${product.price}
        </TableCell>
        <TableCell className={classes.cell} align='left'>
          <img
            src={product.image}
            className={classes.productImg}
            width='50'
            height='70'
          />
        </TableCell>
        {addToCart && (
          <TableCell className={classes.cell}>
            <Button
              className={classes.button}
              onClick={(ev) => addToCart?.(product, ev)}
            >
              Add To Cart
            </Button>
          </TableCell>
        )}
      </TableRow>
    </section>
  );
};
