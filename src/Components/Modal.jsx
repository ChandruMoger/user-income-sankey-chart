import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";
const CustomModal =({open, toggle, header, body, footer}) => {  

  return (
    <div>
      <Modal isOpen={open} toggle={toggle}>
        {header && <ModalHeader data-testid="modal-title" toggle={toggle}>{header}</ModalHeader>}
        {body && <ModalBody>
          {body}
        </ModalBody>}
        {footer && <ModalFooter>
          {footer}
        </ModalFooter>}
      </Modal>
    </div>
  );
}

export default CustomModal;

CustomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  header: PropTypes.object,
  body: PropTypes.object,
  footer: PropTypes.object
};
