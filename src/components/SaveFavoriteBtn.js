import React from 'react';
import Button from '@mui/material/Button';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/Auth';

export default function SaveFavoriteBtn({ posterId }) {
  const { user } = useAuth();
  // const [favorite, setFavorite] = useState(null);

  async function saveToFave(e) {
    e.preventDefault();
    console.log('posterId', posterId);
    const { favorite, error } = await supabase.from('favorite_manga').insert([
      {
        user_id: user.id,
        manga_id: posterId,
      },
    ]);
  }
  return (
    <Button size="small" onClick={saveToFave}>
      Save2Fave
    </Button>
  );
}
