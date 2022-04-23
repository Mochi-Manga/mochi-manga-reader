import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, ButtonGroup, Stack, Box } from '@mui/material';

function Browse(props) {
  const [genre, setGenre] = useState([]);
  const [genreManga, setGenreManga] = useState([]);
  const getGenresRequest = async () => {
    const genres = `https://kitsu.io/api/edge/genres`;
    axios.get(genres).then(function (response) {
      const allGenres = response.data.data;
      console.log(allGenres);
      setGenre(allGenres);
    });
  };
  useEffect(() => {
    getGenresRequest();
  }, []);

  const getGenreMangas = async () => {
    const genres = `https://kitsu.io/api/edge/genres`;
    axios.get(genres).then(function (response) {
      const genreMangas = response.data.data;
      setGenreManga(genreMangas);
    });
  };
  useEffect(() => {
    getGenreMangas();
  }, []);

  const genreList = () => {
    console.log('lcick');
  };

  return (
    <Box sx={{ padding: 5 }}>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
        {genre.map((gen) => (
          <ButtonGroup
            sx={{
              padding: 0.5,
            }}
            color="secondary"
            variant="outlined"
          >
            <Button sx={{ maxWidth: 200, maxHeight: 50 }} onClick={genreList}>
              {gen.attributes.name}
            </Button>
          </ButtonGroup>
        ))}
      </Stack>
    </Box>
  );
}

export default Browse;

// https://kitsu.io/api/edge/categories
