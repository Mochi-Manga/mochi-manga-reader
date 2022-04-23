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
    const popular = `https://kitsu.io/api/edge/manga?sort=popularityRank`;
    const adventureGenre = `https://kitsu.io/api/edge/manga/?filter[categories]=adventure`;
    const comedyGen = `https://kitsu.io/api/edge/manga/?filter[categories]=comedy`;
    const romanceGen = `https://kitsu.io/api/edge/manga/?filter[categories]=romance`;
    const getPopular = axios.get(popular);
    const getAdventure = axios.get(adventureGenre);
    const getCom = axios.get(comedyGen);
    const getRom = axios.get(romanceGen);
    axios.all([getPopular, getAdventure, getCom, getRom]).then(
      axios.spread((...allData) => {
        const allPopular = allData[0].data.data;
        const allAdventure = allData[1].data.data;
        const allCom = allData[2].data.data;
        const allRom = allData[3].data.data;

        setMangasPop(allPopular);
        setMangaAd(allAdventure);
        setMangaCom(allCom);
        setMangaRom(allRom);
      })
    );
  };
  useEffect(() => {
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
          <Typography sx={{ paddingTop: 5, paddingBottom: 0 }} variant="h5">
            Comedy:
          </Typography>
          <MangaList mangas={mangaCom} />
          <Typography sx={{ paddingTop: 5, paddingBottom: 0 }} variant="h5">
            Romance:
          </Typography>
          <MangaList mangas={mangaRom} />
        </Container>
      </Box>
    </div>
  );
}

export default Main;
