import { useState } from 'react';
import { supabase } from '../supabaseClient';
import {
  Box,
  Stack,
  Typography,
  Button,
  FormControl,
  FormLabel,
  Input,
  Snackbar,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  //   const toast = useToast();

  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      Snackbar({
        title: 'Account created',
        position: 'top',
        description: 'Check your email for the login link',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      Snackbar({
        title: 'Error',
        position: 'top',
        description: error.error_description || error.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Box justifyContent="center" alignItems="center">
        <Stack spacing={8} mx={'auto'} py={12} px={6} align={'center'}>
          <Stack>
            <Typography fontSize={'4xl'}>Sign in to Mochi Manga</Typography>
            <Typography fontSize={'lg'} color={'gray.600'}>
              via magic link with your email below ✌️
            </Typography>
          </Stack>
          <Box
            justifyContent="center"
            alignItems="center"
            boxShadow={3}
            sx={{ width: 400, padding: 5 }}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </FormControl>
              <Stack spacing={10}>
                <LoadingButton
                  size="small"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogin(email);
                  }}
                  endIcon={<SendIcon />}
                  loading={loading}
                  loadingPosition="end"
                  variant="outlined"
                >
                  Send Magic Link
                </LoadingButton>
                <Snackbar
                  isLoading={loading}
                  autoHideDuration={6000}
                  // onClose={handleClose}
                  message="Signing in..."
                  //   action={action}
                />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </div>
  );
}
