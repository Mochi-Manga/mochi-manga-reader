import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/Auth';
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

export function Login() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, setError] = useState(null);

  const { signIn } = useAuth();

  const navigate = useNavigate();

  async function loginUser(e) {
    e.preventDefault();

    try {
      signIn({ email, password });
      navigate('/dashboard');
    } catch (error) {
      throw new Error('Error in login: ' + error);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={loginUser} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={(e) => setemail(e.target.value)}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e) => setpassword(e.target.value)}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    // <Box
    //   sx={{
    //     display: 'flex',
    //     justifyContent: 'center',
    //   }}
    // >
    //   {/* <Container p={2}>
    //     <Box textAlign="center">
    //       <Typography variant="h4">Login</Typography>
    //     </Box> */}
    //   <Box my={4} textAlign="left" p={8}>
    //     <Stack>
    //       <form onSubmit={(e) => loginUser(e)}>
    //         <Stack py={2}>
    //           <FormControl>
    //             <InputLabel>Email</InputLabel>
    //             <Input
    //               onChange={(e) => setemail(e.target.value)}
    //               type="email"
    //               placeholder="Your email"
    //             />
    //           </FormControl>
    //         </Stack>
    //         <Stack py={2}>
    //           <FormControl mt={6}>
    //             <InputLabel>Password</InputLabel>
    //             <Input
    //               onChange={(e) => setpassword(e.target.value)}
    //               type="password"
    //               placeholder="*********"
    //             />
    //           </FormControl>
    //         </Stack>
    //         <Stack py={2}>
    //           <Typography>
    //             Don't have an account? <Link to="/signup">Sign Up</Link>
    //           </Typography>
    //         </Stack>
    //         <Stack py={3}>
    //           <Button width="full" mt={4} type="submit">
    //             Log In
    //           </Button>
    //         </Stack>
    //       </form>
    //     </Stack>
    //   </Box>
    //   {/* </Container> */}
    // </Box>
  );
}
