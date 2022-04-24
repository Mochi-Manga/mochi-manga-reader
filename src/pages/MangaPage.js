import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SaveFavoriteBtn from '../components/SaveFavoriteBtn';
import { Container } from '@mui/material';


export default function MangaPage(props) {
  console.log(props);

  return (
    <Container sx={{ maxWidth: 2000 }} className="card">
      <CardContent>
        <Typography variant="h5" component="div" className='title'>
          Test
          {/* {poster.attributes.canonicalTitle} */}
        </Typography>
        {/* <img src={poster.attributes.posterImage.large} alt='manga img'></img> */}
        <Typography variant="body2" sx={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'wrap'
          }}>
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
