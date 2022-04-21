import React from 'react';
import { Card, CardMedia, CardContent, Grid, Typography } from '@mui/material';

const MangaList = (props) => {
  return (
    <Grid sx={{ flexGrow: 1 }} container p={10}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" style={{ gap: 10 }}>
          {props.mangas.map((manga, index) => (
            <Card sx={{ p: 3, maxWidth: 120 }}>
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
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MangaList;
