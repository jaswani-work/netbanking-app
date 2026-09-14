import React, { useState } from 'react';
import { useAuth } from 'sharedState/useAuth';
import { pushNotification } from 'sharedState/notifications';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

// Owned by Team C - Fund Transfer.
export default function TransferApp() {
  const { user } = useAuth();
  const [txns, setTxns] = useState([]);
  const [payee, setPayee] = useState('John Tan');

  console.log('[transfer-mfe] rendering for customer:', user && user.name);

  function transfer(amount) {
    const txn = { id: Date.now(), amount, payee, at: new Date().toLocaleTimeString() };
    setTxns((prev) => [txn, ...prev]);
    pushNotification(`Transfer of $${amount} to ${payee} completed at ${txn.at}`, amount);
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Fund Transfer
      </Typography>
      <Chip label="no real funds" size="small" sx={{ mb: 2 }} />
      

      <Card elevation={2} sx={{ maxWidth: 480 }}>
        <CardContent>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="payee-label">Transfer to</InputLabel>
            <Select
              labelId="payee-label"
              label="Transfer to"
              value={payee}
              onChange={(e) => setPayee(e.target.value)}
            >
              <MenuItem value="John Tan">John Tan</MenuItem>
              <MenuItem value="Priya Nair">Priya Nair</MenuItem>
              <MenuItem value="Wei Ling">Wei Ling</MenuItem>
            </Select>
          </FormControl>

          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={() => transfer(50)}>
              Transfer $50
            </Button>
            <Button variant="outlined" onClick={() => transfer(120)}>
              Transfer $120
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Typography variant="subtitle2" sx={{ mt: 4, mb: 1 }} color="text.secondary">
        Recent transfers (local to this module)
      </Typography>
      <Divider sx={{ mb: 1 }} />
      {txns.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No transfers yet.
        </Typography>
      ) : (
        <List dense sx={{ maxWidth: 480 }}>
          {txns.map((t) => (
            <ListItem key={t.id} disableGutters>
              <ListItemText primary={`$${t.amount} to ${t.payee}`} secondary={t.at} />
            </ListItem>
          ))}
        </List>
      )}      
    </Box>
  );
}
