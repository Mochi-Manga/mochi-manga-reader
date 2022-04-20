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
    } catch (error) {
      throw new Error('Error in login: ' + error);
    }

    navigate('/dashboard');
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {/* <Container p={2}>
        <Box textAlign="center">
          <Typography variant="h4">Login</Typography>
        </Box> */}
      <Box my={4} textAlign="left" p={8}>
        <Stack>
          <form onSubmit={(e) => loginUser(e)}>
            <Stack py={2}>
              <FormControl>
                <InputLabel>Email</InputLabel>
                <Input
                  onChange={(e) => setemail(e.target.value)}
                  type="email"
                  placeholder="Your email"
                />
              </FormControl>
            </Stack>
            <Stack py={2}>
              <FormControl mt={6}>
                <InputLabel>Password</InputLabel>
                <Input
                  onChange={(e) => setpassword(e.target.value)}
                  type="password"
                  placeholder="*********"
                />
              </FormControl>
            </Stack>
            <Stack py={2}>
              <Typography>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </Typography>
            </Stack>
            <Stack py={3}>
              <Button width="full" mt={4} type="submit">
                Log In
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
      {/* </Container> */}
    </Box>
  );
}
