import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function MangaApi() {
  const [meta, setMeta] = useState()
  useEffect(async () => {
    const mangaMeta = await axios.get('https://kitsu.io/api/edge/manga/');
    console.log(mangaMeta);
    setMeta(mangaMeta)
  }, []);
  return (
    mangaMeta
  )
}
