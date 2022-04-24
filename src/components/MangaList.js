import React from 'react';
import { Card, CardMedia, CardContent, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MangaList = (props) => {
  const navigate = useNavigate();
  const [id, setId] = useState();

  const clickForId = () => {
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
            <Link
              to={manga.id}
              style={{ textDecoration: 'none' }}
              onClick={clickForId}
            >
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
