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

export function Dashboard({ session }) {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState();
  const [favMangas, setFavMangas] = useState();
  let favMangaIdarray = [];

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
    try {
      const user = supabase.auth.user();
      let { data, error, status } = await supabase
        .from('favorite_manga')
        .select(`manga_id, user_id`)
        .eq('user_id', user.id);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        // data is one array of multiple objects
        data.forEach((row) => {
          console.log('row', row.manga_id);
          favMangaIdarray.push(row.manga_id);
        });
        console.log(favMangaIdarray);
        // setFavMangas(favMangaIdarray);
        // data.map((row) => {
        //   console.log('mangaid', row.manga_id);
        //   setFavMangas({ ...favMangas, mangaid: row.manga_id });
        //   console.log(favMangas);
        // });
      }
    } catch (error) {
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
        <Typography>Favorite Mangas: {favMangaIdarray}</Typography>
      </Box>
    </Container>
  );
}
