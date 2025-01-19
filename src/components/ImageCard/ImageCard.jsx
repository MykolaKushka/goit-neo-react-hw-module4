import PropTypes from 'prop-types';
import styles from './ImageCard.module.css';

const ImageCard = ({ image, onImageClick }) => {
  const { urls, alt_description } = image;

  return (
    <li className={styles.item} onClick={() => onImageClick(image)}>
      <img
        src={urls.small}
        alt={alt_description || 'Image'}
        className={styles.image}
      />
    </li>
  );
};

ImageCard.propTypes = {
  image: PropTypes.shape({
    urls: PropTypes.shape({
      small: PropTypes.string.isRequired,
      regular: PropTypes.string.isRequired,
    }).isRequired,
    alt_description: PropTypes.string,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageCard;