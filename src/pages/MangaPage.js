import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SaveFavoriteBtn from '../components/SaveFavoriteBtn';
import { Container } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { render } from '@testing-library/react';

const MangaPage = () => {
  const [poster, setPoster] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const response = async () => {
      setLoading(true);
      try {
        const data = await axios.get(`https://kitsu.io/api/edge/manga/${id}`);
        console.log('data line 30 ', data);
        setPoster({ data });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('error ', error);
      }
    };
    response();
  }, []);

  if (loading) {
    return <span>Loading</span>;
  }
  return (
    <Container sx={{ maxWidth: 2000 }} className="card">
      <CardContent>
        <Typography variant="h5" component="div" className="title">
          {console.log('poster line 50 ', poster)}
          {poster.data.data.data.attributes.canonicalTitle}
        </Typography>
        <img
          src={poster.data.data.data.attributes.posterImage.large}
          alt="manga img"
        ></img>
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
          {poster.data.data.data.attributes.synopsis}
        </Typography>
      </CardContent>
      <CardActions>
        <SaveFavoriteBtn posterId={poster.data.data.data.id} />
      </CardActions>
    </Container>
  );
};

export default MangaPage;
