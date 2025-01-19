import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import styles from './ImageModal.module.css';

ReactModal.setAppElement('#root'); 

const ImageModal = ({ isOpen, onClose, image }) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={onClose}
    className={styles.modal}
    overlayClassName={styles.overlay}
  >
    {image ? (
      <img
        src={image.urls?.regular || ''}
        alt={image.alt_description || 'Image'}
        className={styles.image}
      />
    ) : (
      <p>No image available</p>
    )}
    <button onClick={onClose} className={styles.closeButton}>x</button>
  </ReactModal>
);

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  image: PropTypes.shape({
    urls: PropTypes.shape({
      regular: PropTypes.string.isRequired,
    }),
    alt_description: PropTypes.string,
  }),
};

export default ImageModal;
