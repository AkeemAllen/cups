import React from 'react';
import './stylesheets/home.scss';
import coffee from '../assets/images/coffee.png';
import { Button, Modal, Backdrop } from '@material-ui/core';
import Login from '../components/login';
import { useSpring, animated } from 'react-spring/web.cjs';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    }
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func
};

function Home() {
  const [open, setOpen] = React.useState(false);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="main">
      <div className="header">
        <div className="header-content">
          <div className="header-text">
            <h1>Coffee Uplifting People&apos;s Spirits</h1>
            <p>
              Made with the love of all people in mind. Enjoy the refreshing
              taste of fellowship
            </p>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                disableElevation
                className="login-btn"
                // onClick={handleOpen}
              >
                LOGIN
              </Button>
            </Link>
          </div>
          <div>
            <img src={coffee} className="vector-img" alt="coffee-vector" />
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 1000
            }}
          >
            <Fade in={open}>
              <Login />
            </Fade>
          </Modal>
        </div>
      </div>
    </div>
  );
}
export default Home;
