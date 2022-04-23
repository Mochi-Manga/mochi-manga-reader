import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { render } from '@testing-library/react';
import { ConstructionOutlined } from '@mui/icons-material';

export default async function saveFavorite(posterId) {
  const user = supabase.auth.user();
  console.log(user);
  const { save, error } = await supabase.from('favorite_manga').insert([
    {
      id: user,
      manga_id: posterId,
      updated_at: moment().format(),
    },
  ]);

  return (
    <Button size='small' onClick={() => save()} >Save2Fave</Button>
  )


}
