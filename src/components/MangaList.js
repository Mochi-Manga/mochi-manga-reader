import React from 'react';
import { Card, CardMedia, CardContent, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

const MangaList = (props) => {
  // const navigate = useNavigate();
  const [id, setId] = useState();
  // console.log('props:', props.mangas[0]);

  const clickForId = (e) => {
    console.log(e);
    console.log(e.target.id);
    console.log(e.currentTarget.id);
    // setId();
    // navigate('/manga/:id');
    console.log('click');
  };

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
            // <a href={manga.links.self}>
            // <Link
            //   to={{ pathname: '/manga' }}
            //   style={{ textDecoration: 'none' }}
            //   onClick={clickForId}
            // >
            <Link to={`/manga/${manga.id}`}>
              <div>
                <Card
                  sx={{
                    p: 3,
                    width: 200,
                    maxWidth: 200,
                    height: 380,
                    maxHeight: 380,
                    ':hover': {
                      boxShadow: 20,
                    },
                  }}
                  mangaId={manga.id}
                >
                  <CardMedia
                    component="img"
                    image={manga.attributes.posterImage.small}
                    alt="pic"
                  />
                  <CardContent>
                    <Typography style={{ wordWrap: 'break-word' }} variant="p">
                      {manga.attributes.canonicalTitle}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
              {/* // </a> */}
            </Link>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MangaList;
