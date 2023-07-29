const axios = require('axios');

export const fetchMusic = async (id: string) => {
  const options = {
    method: 'GET',
    url: 'https://ytstream-download-youtube-videos.p.rapidapi.com/dl',
    params: { id: id },
    headers: {
      'X-RapidAPI-Key': process.env.YT_API_KEY,
      'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
