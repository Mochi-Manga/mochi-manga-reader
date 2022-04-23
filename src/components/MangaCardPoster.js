import React, { useEffect, useState } from 'react';
import MangaCard from './MangaCard';
import MangaApi from '../services/MangaAPI';
import { Box } from '@mui/material';

function MangaCardPoster() {
  const [posters, setPosters] = useState([]);
  const fetchData = async () => {
    const response = await MangaApi();
    console.log(response);
    setPosters(response.data.data);
  }
  useEffect(() => {
    fetchData();
  },[]) 

  return (
    <Box className='manga-row' sx={{ 
      display: 'flex',
      flexWrap: 'wrap',
      flex: '1',
      justifyContent: 'space-between',
      padding: '10px',
      gap: '10px'
     }}>
      {posters.map((poster) => {
        return (
          <div className='manga-card'>
          <MangaCard poster={poster} />
          </div>
        )
      })}
    </Box>
    )
}

export default MangaCardPoster
