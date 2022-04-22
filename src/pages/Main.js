import { Typography, Box, Container } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import MangaList from '../components/MangaList';
import axios from 'axios';

function Main() {
  const [mangaPop, setMangasPop] = useState([]);
  const [mangaAd, setMangaAd] = useState([]);
  const [mangaCom, setMangaCom] = useState([]);
  const [mangaRom, setMangaRom] = useState([]);
  const getMangaRequest = async () => {
    // const url = `https://kitsu.io/api/edge/manga?sort=popularityRank`;
    // const response = await fetch(url);
    // const responseJson = await response.json();
    // console.log(responseJson.data);

    // if (responseJson.data) {
    //   setMangas(responseJson.data);
    // }
    const popular = `https://kitsu.io/api/edge/manga?sort=popularityRank`;
    const adventureGenre = `https://kitsu.io/api/edge/manga/?filter[categories]=adventure`;
    const comedyGenre = `https://kitsu.io/api/edge/manga/?filter[categories]=comedy`;
    const romanceGenre = `https://kitsu.io/api/edge/manga/?filter[categories]=romance`;
    const getPopular = axios.get(popular);
    const getAdventure = axios.get(adventureGenre);
    // const getAdventure = axios.get(adventureGenre);
    // const getAdventure = axios.get(adventureGenre);
    axios.all([getPopular, getAdventure]).then(
      axios.spread((...allData) => {
        const allPopular = allData[0].data.data;
        const allAdventure = allData[1].data.data;

        console.log(allAdventure);
        setMangasPop(allPopular);
        setMangaAd(allAdventure);
      })
    );
  };
  useEffect(() => {
    console.log('is this working');
    getMangaRequest();
  }, []);

  return (
    <div>
      <Box>
        <Container>
          <Typography
            sx={{ paddingTop: 5, paddingBottom: 0, paddingLeft: 5 }}
            variant="h5"
          >
            Most Popular:
          </Typography>
          <MangaList mangas={mangaPop} />
          <Typography
            sx={{ paddingTop: 5, paddingBottom: 0, paddingLeft: 5 }}
            variant="h5"
          >
            Adventure:
          </Typography>
          <MangaList mangas={mangaAd} />
          {/* <Typography sx={{ paddingTop: 5, paddingBottom: 0 }} variant="h5">
            Most Popular:
          </Typography>
          <MangaList mangas={manga} />
          <Typography sx={{ paddingTop: 5, paddingBottom: 0 }} variant="h5">
            Most Popular:
          </Typography>
          <MangaList mangas={manga} /> */}
        </Container>
      </Box>
    </div>
  );
}

export default Main;
