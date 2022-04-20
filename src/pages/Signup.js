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
} from '@mui/material';
import moment from 'moment';
import { supabase } from '../supabaseClient';

export function Signup() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [username, setusername] = useState('');
  const [errorMessage, seterrorMessage] = useState(null);

  // Get signup function from auth context
  const { signUp } = useAuth();

  const navigate = useNavigate();

  async function SignUpUser(e) {
    // Get emaila nd password input val
    e.preventDefault();
    const { user, session, error } = await signUp({
      email,
      password,
    });

    const superbaseResponse = await supabase.from('profiles').insert([
      {
        username: username,
        id: user.id,
        updated_at: moment().format(),
        avatar_url: null,
        website: null,
      },
    ]);
    console.log(superbaseResponse);
    // console.log(response);
    // confirmPassword === password
    //   ? signUp({ email, password, username })
    //   : seterrorMessage('PASSWORDS_DONT_MATCH');

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
        {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        > */}

      {/* <Typography variant="h4" p={10}>
        Sign Up
      </Typography> */}

      {/* </Box> */}
      <Box my={4} textAlign="left" p={8}>
        <Stack>
          <Typography variant="h3" p={5}>
            Sign Up
          </Typography>
        </Stack>
        <Stack py={2}>
          <form onSubmit={(e) => SignUpUser(e)}>
            <Stack>
              <FormControl>
                <InputLabel>Userame</InputLabel>
                <Input
                  onChange={(e) => setusername(e.target.value)}
                  placeholder="Username"
                  required
                />
              </FormControl>
            </Stack>

            <Stack py={2}>
              <FormControl mt={6}>
                <InputLabel>Email</InputLabel>
                <Input
                  type="email"
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="Your email"
                  required
                />
              </FormControl>
            </Stack>
            <Stack py={2}>
              <FormControl mt={6}>
                <InputLabel>password</InputLabel>
                <Input
                  type="password"
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="*********"
                  required
                />
              </FormControl>
            </Stack>
            <Stack py={2}>
              <FormControl mt={6}>
                <InputLabel>confirm password</InputLabel>
                <Input
                  placeholder="*********"
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  required
                />
              </FormControl>
            </Stack>
            <Typography variant="p">
              Have an account already? <Link to="/login">Log In</Link>
            </Typography>
            <Stack py={2}>
              <Button width="full" mt={4} type="submit">
                Sign Up
              </Button>
            </Stack>
            <Typography fontSize="lg" color="red" align="center">
              {errorMessage && errorMessage}
            </Typography>
          </form>
        </Stack>
      </Box>
      {/* </Container> */}
    </Box>
  );
}
