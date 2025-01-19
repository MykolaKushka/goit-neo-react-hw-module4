import axios from 'axios';

const BASE_URL = 'https://api.unsplash.com/search/photos';

export const fetchImages = async (query, page = 1, perPage = 12) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        query,
        page,
        per_page: perPage,
        client_id: import.meta.env.VITE_REACT_APP_UNSPLASH_ACCESS_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error.message);
    throw new Error('Failed to fetch images');
  }
};
