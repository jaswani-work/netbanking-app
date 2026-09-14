import React, { useState } from 'react';
import { useAuth } from 'sharedState/useAuth';
import { login } from 'sharedState/authStore';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

// Owned by Team A - Sign-In / NetBanking landing.
export default function SignInApp() {
  const { isAuthenticated, user } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  console.log('[signin-mfe] rendering, authenticated =', isAuthenticated);

  if (isAuthenticated) {
    return (
      <Box sx={{ textAlign: 'center', py: { xs: 4, sm: 8 } }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Welcome back, {user.name} 👋
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 480, mx: 'auto' }}>
          You have successfully signed in. You can now access your accounts, transfer funds, and other services.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', px: 2, py: { xs: 3, sm: 6 } }}>
      <Card elevation={3} sx={{ width: '100%', maxWidth: 400 }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Sign In
          </Typography>
          <Alert severity="info" sx={{ mb: 2, fontSize: 13 }}>
            Demo only - enter any username/password, no real accounts involved.
          </Alert>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              if (username.trim()) {
                login({
                  name: username.trim(),
                  email: `${username.trim().toLowerCase()}@example.com`,
                });
              }
            }}
          >
            <Stack spacing={2}>
              <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                required
                autoFocus
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              />
              <Button type="submit" variant="contained" size="large" fullWidth>
                Sign In
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
