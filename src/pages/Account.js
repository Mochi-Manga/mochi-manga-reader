// import { Box, Avatar } from '@mui/material';
// import { useState, useEffect } from 'react';
// import { supabase } from '../supabaseClient';
// import { deepPurple } from '@mui/material/colors';

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

export function Dashboard() {
  const { user, signOut } = useAuth();
  console.log(user);

  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();

    navigate('/login');
  }

  return (
    <div>
      <p>Welcome, {user?.id}!!</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
