import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { render } from '@testing-library/react';
import { ConstructionOutlined } from '@mui/icons-material';
import { supabase } from '../supabaseClient';
import moment from 'moment';
import { useAuth } from '../contexts/Auth';

// export default function SaveFavorite(posterId) {
//   const { user } = useAuth();
//   console.log(user);
//   //   console.log(user);
//   //   const { save, error } = await supabase.from('favorite_manga').insert([
//   //     {
//   //       id: user,
//   //       manga_id: posterId,
//   //       updated_at: moment().format(),
//   //     },
//   //   ]);
//   const printClick = () => {
//     console.log('click');
//   };

//   //   return (
//   //     <Button size="small" onClick={() => save()}>
//   //       Save2Fave
//   //     </Button>
//   //   );

//   return (
//     <Button size="small" onClick={printClick}>
//       Save2Fave
//     </Button>
//   );
// }

export default function SaveFavoriteBtn(posterId) {
  const user = supabase.auth.user();
  const [favorite, setFavorite] = useState(null);

  async function saveToFave(e) {
    const { favorite, error } = await supabase.from('favorite_manga').insert([
      {
        id: user,
        manga_id: posterId,
        updated_at: moment().format(),
      },
    ]);
    console.log('Error ' + error);
  }

  return (
    <Button size="small" onClick={() => saveToFave()}>
      Save2Fave
    </Button>
  );
}
