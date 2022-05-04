import React, { useEffect, useState } from 'react';
import MangaCard from './MangaCard';
import MangaApi from '../services/MangaAPI';
import { Box } from '@mui/material';


// async function getFavMangas() {
//   let favMangasArr = [];
//   const uniqueMangas = Array.from(new Set(favMangasArr))
//   try {
//     const user = supabase.auth.user();
//     let { data, error, status } = await supabase
//       .from('favorite_manga')
//       .select(manga_id)
//       .eq('user_id', user.id);

//     if (error && status !== 406) {
//       throw error;
//     }

//     if (data) {
//       console.log(data);
//       for (const mangaid of data) {
//         console.log(mangaid);
//         favMangasArr.push(mangaid);
//       }
//       console.log('mangaids:', favMangasArr);
//     }
//   } catch (error) {
//     alert(error.message);
//   }
// }

async function getFavMangas() {
  let favMangasArr = [];
  const uniqueMangas = Array.from(new Set(favMangasArr))
  try {
    const user = supabase.auth.user();
    let { data, error, status } = await supabase
      .from('favorite_manga')
      .select(`manga_id`)
      .eq('user_id', user.id);

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      // console.log(data);
      for (const mangaid of data) {
        favMangasArr.push(mangaid);
      }
    }
  } catch (error) {
    alert(error.message);
  }
}


useEffect(() => {
  getFavMangas();
}, [session]);

// function MangaCardPoster() {
//   const [posters, setPosters] = useState([]);
//   const fetchData = async () => {
//     const response = await MangaApi();
//     setPosters(response.data.data);
//   }
//   useEffect(() => {
//     fetchData();
//   },[]) 

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
          <MangaCard poster={poster}/>
          </div>
        )
      })}
    </Box>
    )
}
