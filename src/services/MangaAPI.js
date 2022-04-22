import React from 'react';
import axios from 'axios';

async function MangaApi() {
  try {
    const response = await axios.get(`https://kitsu.io/api/edge/manga/`, {
      params: {
        sort: 'popularityRank',
      },
    });

    return response.data;
  } catch (e) {
    console.log('error has occurred: ' + e);
  }
}

export default MangaApi;
