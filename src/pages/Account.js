// import { Box, Avatar } from '@mui/material';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { deepPurple } from '@mui/material/colors';
import MangaPage from './MangaPage';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/Auth';
import { FlashOnOutlined } from '@mui/icons-material';
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  Button,
  Input,
  Typography,
  Stack,
  TextField,
  Grid,
  Paper,
  CssBaseline,
  Avatar,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import axios from 'axios';
import MangaCard from '../components/MangaCard';

export function Dashboard({ session }) {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState();
  const [favMangas, setFavMangas] = useState([]);
  let favMangasArr = [];

  console.log('user', user);

  async function getProfile() {
    try {
      const user = supabase.auth.user();
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`id, username`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
      }
    } catch (error) {
      alert(error.message);
    }
    console.log('username', username);
  }

  async function getFavMangas() {
    setLoading(true);
    try {
      const user = supabase.auth.user();
      let { data, error, status } = await supabase
        .from('favorite_manga')
        .select(`manga_id`)
        .eq('user_id', user.id);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        console.log(data);
        for (const mangaid of data) {
          const data = await axios.get(
            `https://kitsu.io/api/edge/manga/${mangaid.manga_id}`
          );
          console.log(mangaid);
          favMangasArr.push(data.data.data);
        }
        console.log('mangaids:', favMangasArr);
        setFavMangas(favMangasArr);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  }

  useEffect(() => {
    getProfile();
  }, [session]);

  useEffect(() => {
    getFavMangas();
  }, [session]);

  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();

    navigate('/login');
  }

  const renderFavMangas = () => {
    return favMangas.map((favManga) => {
      {
        console.log(favManga);
      }
      <MangaCard favManga={favManga} />;
    });
  };

  if (loading) {
    return <span>Loading</span>;
  }

  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <Box>
          <Grid>
            <Typography>Email: {session.user.email}</Typography>
            <Typography>Username: {username}</Typography>
          </Grid>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </Box>
        <Typography>
          Favorite Mangas: {renderFavMangas()}
          {/* {favMangas.map((favManga) => {
            return (
              <div className="manga-card">
                {renderFavMangas}
                <MangaCard favManga={favManga} />
                {console.log(favManga)}
              </div>
            );
          })} */}
          <Box
            className="manga-row"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              flex: '1',
              justifyContent: 'space-between',
              padding: '10px',
              gap: '10px',
            }}
          >
            {favMangas.map((favManga) => {
              return (
                <div className="manga-card">
                  {/* {console.log(poster)} */}
                  <MangaCard poster={favManga} />
                </div>
              );
            })}
          </Box>
        </Typography>
      </Box>
    </Container>
  );
}
