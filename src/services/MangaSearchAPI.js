import React from 'react';
import axios from 'axios';

async function MangaSearchApi(searchValue) {
  try {
    const response = await axios.get(
      `https://kitsu.io/api/edge/manga?filter[text]=${searchValue}`
    );
    return response;
  } catch (e) {
    console.log('error has occurred: ' + e);
  }
}

export default MangaSearchApi;
