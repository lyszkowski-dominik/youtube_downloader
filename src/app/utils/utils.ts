import axios, { AxiosError } from 'axios';

/**
 * The `fetchMusic` function is an asynchronous function that fetches a download music link from a YouTube video URL using the
 * YouTube MP3 API.
 * @param {string} id - The `id` parameter is the unique identifier of the music video that you want to fetch. It is used
 * to specify which video you want to download from YouTube.
 * @returns The function `fetchMusic` returns a Promise that resolves to a string representing the download link for a
 * music video.
 */
export const fetchMusic = async (id: string) => {
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
    if (link === '') throw new my_error("Video can't be downloaded");
    return link;
  } catch (error: any) {
    if (error instanceof AxiosError || error instanceof Error)
      throw new my_error('Error parsing URL', error);
  }
};

/**
 * The function `extractID` takes a YouTube video URL as input and returns the video ID extracted from the URL.
 * @param {string} url - The `url` parameter is a string that represents a YouTube video URL.
 * @returns The function `extractID` returns a string.
 */
export const extractID = (url: string): string => {
  const rx =
    /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  const r = url.match(rx) ?? 'Error';
  return r[1];
};

/**
 * The function `validateURL` checks if a given URL is valid and returns an error message if it is not.
 * @param {string} url - The `url` parameter is a string that represents a URL.
 * @returns The function `validateURL` returns a string if there is an error in the URL, otherwise it returns `undefined`.
 */
export const validateURL = (url: string): string | undefined => {
  let error;
  if (!url) error = 'Invalid URL';
  if (!url.includes('youtu')) error = 'Invalid URL';
  return error;
};

export class my_error {
  constructor(public message: string, public cause?: Error) {}
}
