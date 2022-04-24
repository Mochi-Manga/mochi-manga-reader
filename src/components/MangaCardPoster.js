import React, { useEffect, useState } from 'react';
import MangaCard from './MangaCard';
import MangaApi from '../services/MangaAPI';
import { Box } from '@mui/material';
import MangaCardInfo from './MangaCardInfo';

function MangaCardPoster(id) {
  const [posters, setPosters] = useState([]);
  const fetchData = async () => {
    const response = await MangaApi(id);
    console.log('response from mangaposter', response);
    setPosters(response.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box
      className="manga-row"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        flex: '1',
        justifyContent: 'space-between',
        padding: '10px',
        gap: '10px',
      }}
    >
      {posters.map((poster) => {
        return (
          <div className="manga-card">
            <MangaCardInfo poster={poster} />
          </div>
        );
      })}
    </Box>
  );
}

export default MangaCardPoster;
