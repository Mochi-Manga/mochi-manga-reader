import React, {useEffect, useState} from 'react';
import axios from 'axios';

const MangaApi = (props) => {
  const [poster, setPoster] = useState([])
  useEffect(async () => {
    const manga = await axios.get('https://kitsu.io/api/edge/manga');
    console.log(manga);
    const mangaData = manga.data.data;
    const posterArray = [];
    mangaData.forEach(element => {
      posterArray.push(element.attributes.posterImage.medium)
    });
    console.log(posterArray);
    setPoster(posterArray)
  }, []);

  return (
    <div>
      <h1>img</h1>
      {poster.map((p) => <img src={p} />)}
    </div>
  )
}

export default MangaApi