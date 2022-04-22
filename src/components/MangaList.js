import React from 'react';
import { Card, CardMedia, CardContent, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const MangaList = (props) => {
  return (
    <Grid
      sx={{ flexGrow: 1, paddingTop: 0, paddingRight: 5, paddingLeft: 5 }}
      container
    >
      <Grid item xs={12}>
        <Grid
          container
          style={{
            display: 'flex',
            justifyContent: 'start',
            flexWrap: 'nowrap',
            gap: 30,
            overflow: 'auto',
          }}
        >
          {props.mangas.map((manga, index) => (
            <a href={manga.links.self}>
              <Card
                sx={{
                  p: 3,
                  maxWidth: 120,
                  ':hover': {
                    boxShadow: 20,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={manga.attributes.posterImage.tiny}
                  alt="pic"
                />
                <CardContent>
                  <Typography style={{ wordWrap: 'break-word' }} variant="p">
                    {manga.attributes.canonicalTitle}
                  </Typography>
                </CardContent>
              </Card>
            </a>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MangaList;