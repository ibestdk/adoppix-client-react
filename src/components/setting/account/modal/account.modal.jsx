import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Box, styled } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import Button from "@mui/base/ButtonUnstyled";
// web.cjs is required for IE11 support
import { useSpring, animated } from "@react-spring/web";
import { red } from "@mui/material/colors";
const BackdropUnstyled = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "MuiBackdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

BackdropUnstyled.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const Modal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

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
    },
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
  onExited: PropTypes.func,
};

const style = () => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid currentColor",
  boxShadow: 24,
  padding: "16px 32px 24px 32px",
});

export default function SpringModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        className="text-adopdark dark:text-adoplight duration-300"
        onClick={handleOpen}
      >
        Open modal
      </Button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
      >
        <Fade in={open}>
          <Box className="rounded-lg  border-none" sx={style}>
            <div className="dark:bg-red-600">
              <h2 id="spring-modal-title dark:text-red-700">Text in a modal</h2>
              <span
                id="spring-modal-description dark:text-red-700"
                style={{ marginTop: "16px" }}
              >
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </span>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
