import axios from 'axios';

const URL = 'https://pixabay.com/api/';

const fetchPhotos = async (searchQuery, page) => {
  const options = {
    params: {
      key: '34333824-9219051eb032542ff34aab4aa',
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 40,
    },
  };

  try {
    const response = await axios.get(URL, options);
    const photos = response.data;
    return photos;
  } catch (error) {
    console.log(error);
  }
};

export { fetchPhotos };
