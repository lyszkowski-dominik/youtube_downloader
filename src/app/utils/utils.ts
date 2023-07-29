const axios = require('axios');

export const fetchMusic = async (
  id: string,
  setResult: (link: string) => void
) => {
  const options = {
    method: 'GET',
    url: 'https://youtube-mp36.p.rapidapi.com/dl',
    params: { id: id },
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_PRODUCTION_YT_API_KEY,
      'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com',
    },
  };
  try {
    const response = await axios.request(options);
    const link = response.data.link;
    setResult(link);
  } catch (error) {
    // implement handling errors
    console.log(error);
  }
};

export const extractID = (url: string): string => {
  const rx =
    /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  const r = url.match(rx) ?? 'Error';
  return r[1];
};
