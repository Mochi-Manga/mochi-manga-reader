import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { render } from '@testing-library/react';
import { ConstructionOutlined } from '@mui/icons-material';
import { supabase } from '../supabaseClient';
import moment from 'moment';
import { useAuth } from '../contexts/Auth';

export default function SaveFavoriteBtn(posterId) {
  console.log('id ',posterId);
  const {user} = useAuth();
  const [favorite, setFavorite] = useState(null)

  async function saveToFave() {
    const {favorite, error} = await supabase.from('favorite_manga').insert([
      {
        user_id: user.id,
        manga_id: posterId,
        updated_at: moment().format(),
      },
    ]);
    console.log('Error ' + error)
  }
  return (
    <Button size='small' onClick={console.log('clicked! ' + posterId)} >Save2Fave</Button>
  )
}
