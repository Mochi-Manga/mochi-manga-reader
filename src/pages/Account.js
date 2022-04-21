// import { Box, Avatar } from '@mui/material';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { deepPurple } from '@mui/material/colors';

// const Account = ({ session }) => {
//   const [loading, setLoading] = useState(true);
//   const [username, setUsername] = useState(null);
//   const [website, setWebsite] = useState(null);
//   const [avatar_url, setAvatarUrl] = useState(null);

//   useEffect(() => {
//     getProfile();
//   }, [session]);

//   const getProfile = async () => {
//     try {
//       setLoading(true);
//       const user = supabase.auth.user();

//       let { data, error, status } = await supabase
//         .from('profiles')
//         .select(`username, website, avatar_url`)
//         .eq('id', user.id)
//         .single();

//       if (error && status !== 406) {
//         throw error;
//       }

//       if (data) {
//         setUsername(data.username);
//         setWebsite(data.website);
//         setAvatarUrl(data.avatar_url);
//       }
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateProfile = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       const user = supabase.auth.user();

//       const updates = {
//         id: user.id,
//         username,
//         website,
//         avatar_url,
//         updated_at: new Date(),
//       };

//       let { error } = await supabase.from('profiles').upsert(updates, {
//         returning: 'minimal', // Don't return the value after inserting
//       });

//       if (error) {
//         throw error;
//       }
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div aria-live="polite">
//       {loading ? (
//         'Saving ...'
//       ) : (
//         <Box
//           w={'full'}
//           boxShadow={'2xl'}
//           rounded={'lg'}
//           p={6}
//           textAlign={'center'}
//           justifyItems={'center'}
//           justifyContent={'center'}
//         >
//           <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
//           <form onSubmit={updateProfile} className="form-widget">
//             <div>Email: {session.user.email}</div>
//             <div>
//               <label htmlFor="username">Name</label>
//               <input
//                 id="username"
//                 type="text"
//                 value={username || ''}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="website">Website</label>
//               <input
//                 id="website"
//                 type="url"
//                 value={website || ''}
//                 onChange={(e) => setWebsite(e.target.value)}
//               />
//             </div>
//             <div>
//               <button className="button block primary" disabled={loading}>
//                 Update profile
//               </button>
//             </div>
//           </form>
//         </Box>
//       )}
//       <button
//         type="button"
//         className="button block"
//         onClick={() => supabase.auth.signOut()}
//       >
//         Sign Out
//       </button>
//     </div>
//   );
// };

// export default Account;

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
  const [website, setWebsite] = useState();
  const [avatar_url, setAvatarUrl] = useState();
  console.log('user', user);

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

  // async function updateProfile() {
  //   try {
  //     const user = supabase.auth.user();
  //     const updates = {
  //       id: user.id,
  //       username,
  //       updated_at: new Date(),
  //     };

  //     let { error } = await supabase.from('profiles').upsert(updates);
  //     if (error) {
  //       throw error;
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // }

  // return (
  //   <div className="container mx-auto grid place-content-center min-h-screen">
  //     <p>Oh hi there {session.user.email}</p>
  //     <input
  //       className="my-4 border-2 border-gray-500 rounded-xl p-4 w-full"
  //       type="username"
  //       placeholder="Enter a username"
  //       value={username}
  //       onChange={(e) => setUsername(e.target.value)}
  //     />
  //     <button
  //       onClick={(e) => {
  //         e.preventDefault();
  //         updateProfile();
  //       }}
  //       className="w-full mt-4 p-2 pl-5 pr-5 bg-blue-500 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300"
  //     >
  //       <span>Update profile</span>
  //     </button>
  //     <p className="mt-4 text-center">or</p>
  //     <button
  //       className="mt-4 p-2 pl-5 pr-5 bg-blue-500 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300"
  //       onClick={() => supabase.auth.signOut()}
  //     >
  //       Logout
  //     </button>
  //   </div>
  // );

  // async function getProfile() {
  //   try {
  //     setLoading(true);
  //     const user = supabase.auth.user();

  //     let { data, error, status } = await supabase
  //       .from('profiles')
  //       .select(`username, website, avatar_url`)
  //       .eq('id', user.id)
  //       .single();

  //     if (error && status !== 406) {
  //       throw error;
  //     }

  //     if (data) {
  //       setUsername(data.username);
  //       setWebsite(data.website);
  //       setAvatarUrl(data.avatar_url);
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   } finally {
  //     setLoading(FlashOnOutlined);
  //   }
  // }

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
      {/* <p>Welcome, {username}!!</p>{' '}
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>{' '}
      <div>
        <label htmlFor="username">Username</label>{' '}
        <input
          id="username"
          type="text"
          value={username}
          disabled
          // onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="website"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div>
        <button
          className="button block primary"
          // onClick={() => updateProfile({ username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>
      <button onClick={handleSignOut}>Sign Out</button> */}
    </Container>
  );
}
