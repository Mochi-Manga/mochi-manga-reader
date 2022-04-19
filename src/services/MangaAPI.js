import React from 'react';
import axios from 'axios';


async function MangaApi(props) {
  try {
    const response = await axios.get(`https://kitsu.io/api/edge/manga/1`);
    let synopsis = toString(response.data.data.attributes.synopsis);
    let poster = response.data.data.attributes.posterImage.medium;
    console.log(synopsis, poster)
  } catch(e) {
    console.log('error has occurred: ' + e)
  }
}

export default MangaApi;