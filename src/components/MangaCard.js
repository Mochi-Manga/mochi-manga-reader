import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MangaApi from '../services/MangaAPI';
import { supabase } from '../supabaseClient';
import moment from 'moment';

export default function MangaCard({ poster }) {
  return (
    <Card sx={{ maxWidth: 400 }} className="card">
      <CardContent>
        <Typography variant="h5" component="div" className="title">
          {poster.attributes.canonicalTitle}
        </Typography>
        <img src={poster.attributes.posterImage.medium} alt="manga img"></img>
        <Typography
          variant="body2"
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            height: '300px',
            whiteSpace: 'wrap',
          }}
        >
          Synopsis
          <br></br>
          {poster.attributes.synopsis}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Save2Fave</Button>
      </CardActions>
    </Card>
  );
}
