// import { Box, Avatar } from '@mui/material';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/Auth';

import {
  Box,
  Container,
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

  // console.log('user', user);

  useEffect(() => {
    getProfile();
  }, [session]);

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
        console.log(data.username);
        setUsername(data.username);
      }
    } catch (error) {
      alert(error.message);
    }
  }

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
      </Box>
    </Container>
  );
}
