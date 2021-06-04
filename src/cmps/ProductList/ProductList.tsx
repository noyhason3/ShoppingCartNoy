import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { TableCell, TableRow } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { Product } from '../../services/product.service'
import { ProductPreview } from '../ProductPreview';
import { Route, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { ProductDetails } from '../../pages/ProductDetails';
import './ProductList.scss'

export const ProductList = ({ products = [], addToCart, match }: { products: Product[], addToCart?: (product: Product, ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void, match?: any }) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: '100%',
      },
      paper: {
        marginBottom: theme.spacing(2),
      },
      table: {
        width: '70vw',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto'
      },
      visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
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
      },
      titleCell: {
        display: 'flex',
        alignItems: 'center',
        width: '34%',
        paddingLeft: '40px'
      },
      addCell: {
        display: 'flex',
        alignItems: 'center',
        width: '33%',
      },
      modal: {
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        width: '1000px',
      },
      modalText: {
        width: '1000px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paperModal: {
        width: '1000px',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        textOverflow: 'ellipsis',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
    }),
  );

  interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
  }

  type Order = 'asc' | 'desc';

  interface Data {
    id: string;
    title: string;
    price: number;
    image: string;
  }

  interface EnhancedTableProps {
    classes: ReturnType<typeof useStyles>;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }

  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('title');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { path, url } = useRouteMatch()
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const headCells: HeadCell[] = [
    { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
    { id: 'image', numeric: false, disablePadding: false, label: 'Image' },
  ];
  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function EnhancedTableHead(props: EnhancedTableProps) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead className={classes.table}>
        <TableRow className={classes.tableRow}>
          {headCells.map((headCell) => (
            <TableCell
              className={headCell.id === 'title' ? classes.titleCell : classes.cell}
              key={headCell.id}
              align='left'
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
          {addToCart && <TableCell className={classes.addCell}></TableCell>}
        </TableRow>
      </TableHead>
    );
  }

  function EnhancedTableBody(props: EnhancedTableProps) {
    const { order, orderBy } = props;
    return (
      <TableBody>
        {stableSort(products, getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((product: Product, index) => {
            return (
              <div>
                <Link to={`${url}/${product.id}`} className='link' >
                  <ProductPreview product={product} addToCart={addToCart} />
                </Link>
              </div>
            );
          })}
        <Route component={ProductDetails} path={`${path}/:id`} />
      </TableBody>
    );
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>

        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={products.length}
            />
            <EnhancedTableBody
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={products.length}
            />
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}