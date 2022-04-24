import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
// import SaveFavoriteBtn from './SaveFavoriteBtn';
import { Container } from '@mui/material';
import MangaApi from '../services/MangaAPI';
import { useLocation, useParams } from 'react-router-dom';

export default function MangaCardInfo({ props }) {
  //   console.log(id);
  const { id } = useParams();
  console.log(id);
  const [poster, setPoster] = useState([]);

  useEffect(() => {
    fetch(`https://kitsu.io/api/edge/manga/${id}`).then((response) =>
      response.json().then((response) => {
        console.log(response.data);
        setPoster(response.data);
      })
    );
  }, []);

  return (
    <Container sx={{ maxWidth: 2000 }} className="card">
      <CardContent>
        <Typography variant="h5" component="div" className="title">
          {/* {poster.attributes.canonicalTitle} */}
        </Typography>
        {/* <img src={poster.attributes.posterImage.large} alt="manga img"></img> */}
        <Typography
          variant="body2"
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'wrap',
          }}
        >
          Synopsis
          <br></br>
          {/* {poster.attributes.synopsis} */}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <SaveFavoriteBtn posterId={poster.id} /> */}
      </CardActions>
    </Container>
  );
}
