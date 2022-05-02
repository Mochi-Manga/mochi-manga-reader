import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Posters = (props) => {
  const [posters, setPosters] = useState([])
  useEffect(async () => {
    const manga = await axios.get('https://kitsu.io/api/edge/manga');
    const mangaData = manga.data.data;
    const posterArray = [];
    mangaData.forEach(element => {
      posterArray.push(element.attributes.posterImage.medium)
    });
    setPosters(posterArray)
  }, []);

  return (
    <div>
      <h1>img</h1>
      {posters.map((p) => <img src={p} />)}
    </div>
  )
}

export default Posters
