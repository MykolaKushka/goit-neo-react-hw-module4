import { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import { fetchImages } from './services/api';
import styles from './App.module.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  const handleSearch = async (newQuery) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setError(null);

    try {
      setIsLoading(true);
      const data = await fetchImages(newQuery);
      const validImages = data.results.filter(
        (img) => img.urls && img.urls.small && img.urls.regular
      );
      setImages(validImages);
    } catch (error) {
      console.error('Search Error:', error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreImages = async () => {
    try {
      setIsLoading(true);
      const data = await fetchImages(query, page + 1);
      const validImages = data.results.filter(
        (img) => img.urls && img.urls.small && img.urls.regular
      );
      setImages((prevImages) => [...prevImages, ...validImages]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Load More Error:', error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery
        images={images}
        onImageClick={(image) => setCurrentImage(image)}
      />
      <ImageModal
        isOpen={!!currentImage}
        onClose={() => setCurrentImage(null)}
        image={currentImage}
      />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <LoadMoreBtn onClick={loadMoreImages} />}
    </div>
  );
};

export default App;
