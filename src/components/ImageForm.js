import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop, Button, Input, Fade, Modal } from '@material-ui/core';
import { uploadImage, updateProduct } from '../redux/actions/productActions.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

const useStyles = makeStyles(theme => ({
  modal: {
    justifyContent: 'center',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    height: '100vh'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '100px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0px 0px 9px 0px rgba(0,0,0,0.7)'
  },
  input: {
    display: 'flex',
    marginBottom: '20px',
    alignItems: 'center',
    borderRadius: '20px',
    backgroundColor: '#ccc5b9',
    paddingRight: '15px',
    paddingLeft: '15px'
  },
  header: {
    display: 'flex',
    justifyContent: 'center'
  },
  submitBtn: {
    marginTop: '20px',
    backgroundImage: 'linear-gradient(45deg, #8e2de2, #4a00e0)',
    color: 'white',
    borderRadius: '25px'
  }
}));

function ImageForm(props) {
  const classes = useStyles();
  const [file, setFile] = React.useState(null);

  const fileSelectedHandler = event => {
    setFile(event.target.files[0]);
  };

  const fileUploadHandler = () => {
    const formData = new FormData();
    formData.append('file', file, file.name);
    props.uploadImage(props.id, formData);
    props.handleClose();
  };

  return (
    <Modal
      className={classes.modal}
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={props.open}>
        <form className={classes.form} encType="multipart/form-data">
          <h1 className={classes.header}>Upload Image</h1>
          <Input
            type="file"
            name="file"
            id="file"
            onChange={fileSelectedHandler}
            disableUnderline
          />
          <Button onClick={fileUploadHandler} className={classes.submitBtn}>
            Upload
          </Button>
        </form>
      </Fade>
    </Modal>
  );
}

ImageForm.propTypes = {
  uploadImage: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
  id: PropTypes.string,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth.isAdmin
});

const mapDispatchToProps = dispatch => ({
  uploadImage: bindActionCreators(uploadImage, dispatch),
  updateProduct: bindActionCreators(updateProduct, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageForm);
