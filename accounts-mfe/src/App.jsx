import React from 'react';
import { useAuth } from 'sharedState/useAuth';
import { useNotifications, clearNotifications } from 'sharedState/notifications';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

// Owned by Team B - Accounts Overview.
export default function AccountsApp() {
  const { user } = useAuth();
  const alerts = useNotifications();

  console.log('[accounts-mfe] rendering for customer:', user && user.name);

  const mockBalance = (2450.75 - alerts.reduce((sum, a) => sum + (a.amount || 0), 0)).toFixed(2);

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Accounts Overview
      </Typography>
      <Chip label="mock account data" size="small" sx={{ mb: 2 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Savings Account · **** 4821
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
              <Typography variant="h4" sx={{ mt: 2 }} color="primary.main">
                ${mockBalance}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Available balance
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" color="text.secondary">
                  Transaction Alerts ({alerts.length})
                </Typography>
                {alerts.length > 0 && (
                  <Button size="small" onClick={clearNotifications}>
                    Clear
                  </Button>
                )}
              </Stack>
              <Divider sx={{ my: 1 }} />
              {alerts.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Go make a transfer in the Fund Transfer tab, then come back here
                  without reloading - your balance and alerts update live.
                </Typography>
              ) : (
                <List dense>
                  {alerts.map((a) => (
                    <ListItem key={a.id} disableGutters>
                      <ListItemText primary={a.message} />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
