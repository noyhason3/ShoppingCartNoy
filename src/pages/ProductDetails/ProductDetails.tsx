import { Backdrop, Fade, makeStyles, Modal } from '@material-ui/core'
import { useState } from 'react';
import './ProductDetails.scss'

export const ProductDetails = () => {
  const [open, setOpen] = useState(false);

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
    <section className="product-details">
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
            </pre>
          </div>
        </Fade>
      </Modal>
    </section>
  )
}

