import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Product } from '../../services/product.service';
import loader from '../../assets/imgs/loader.svg'
import './ModalCmp.scss';

export const ModalCmp = ({ handleClose, open, currProduct, totalPrice, loading }: { handleClose: () => void, open: boolean, currProduct?: Partial<Product>, totalPrice?: number, loading?: boolean }) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
      productImg: {
        width: '250px',
      }
    }))

  const classes = useStyles();

  return (
    <section className='modal-cmp'>
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
        <div>
          {(() => {
            if (loading) {
              return (<div className="loader-container">
                <img src={loader} className="loader" />
              </div>)
            } else if (currProduct) {
              return (
                <Fade in={open}>
                  <div className={classes.paperModal}>
                    <h2 id='transition-modal-title'>{currProduct?.title}</h2>
                    <p className={classes.modalText} id='transition-modal-description'>
                      <p className={classes.modalText}>{currProduct?.description}</p>
                      <img src={currProduct.image} className={classes.productImg} />
                      <p className={classes.modalText}>${currProduct?.price}</p>
                    </p>
                  </div>
                </Fade>
              )
            } else {
              return (
                <Fade in={open}>
                  <div className={classes.paperModal}>
                    <h2 id='transition-modal-title'>Congrats!</h2>
                    <p id='transition-modal-description'>
                      You've checked out successfully.
                      Hope to see you again!
                  </p>
                    <p>
                      Total: ${totalPrice?.toFixed(2) || 0}
                    </p>
                  </div>
                </Fade>
              )
            }
          })()}
        </div>
      </Modal>
    </section>
  );
};
