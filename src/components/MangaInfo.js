import React, { useState } from 'react';
import { useEffect } from 'react';
import MangaCardInfo from './MangaCardInfo';
import MangaApi from '../services/MangaAPI';
import { Box, Typography } from '@mui/material';

const MangaInfo = () => {
  //   const [mangaInfo, setMangaInfo] = useState([]);
  //   //   const { selectedManga } = props;

  //   const fetchData = async () => {
  //     const response = await MangaApi();
  //     console.log(response);
  //     setMangaInfo(response.data.data);
  //   };

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  //   return (
  //     <div>
  //       <MangaCard mangaInfo={mangaInfo} />
  //     </div>
  //   );

  const [poster, setPoster] = useState();
  const fetchData = async () => {
    const response = await MangaApi();
    console.log('response from mangaposter', response.data.data.attributes);
    setPoster(response.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    // <Box
    //   className="manga-row"
    //   sx={{
    //     display: 'flex',
    //     flexWrap: 'wrap',
    //     flex: '1',
    //     justifyContent: 'space-between',
    //     padding: '10px',
    //     gap: '10px',
    //   }}
    // >

    <div>
      <MangaCardInfo poster={poster} />
    </div>
    /* {posters.map((poster) => {
        return (
          <div className="manga-card">
            <MangaCard poster={poster} />
          </div>
        );
      })}
      <Typography style={{ wordWrap: 'break-word' }} variant="p">
        {posters.attributes.canonicalTitle}
      </Typography> */
    // </Box>
  );
};

export default MangaInfo;
