import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useAuth } from 'sharedState/useAuth';
import { logout } from 'sharedState/authStore';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Accounts', to: '/dashboard' },
  { label: 'Fund Transfer', to: '/payments' },
];

// Nav links only render once a session exists.
export default function Nav() {
  const { isAuthenticated, user } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // const visibleItems = isAuthenticated ? NAV_ITEMS : NAV_ITEMS.filter((item) => item.to === '/');
  const visibleItems = isAuthenticated ? NAV_ITEMS : [];

  return (
    <>
      <AppBar position="static" elevation={1}>
        <Toolbar sx={{ gap: 2 }}>
          <AccountBalanceIcon />
          <Typography variant="h6" sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
            NetBanking{' '}
            <Typography component="span" variant="caption" sx={{ opacity: 0.8 }}>
              (Demo)
            </Typography>
          </Typography>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1, ml: 2 }}>
            {visibleItems.map((item) => (
              <Button key={item.to} color="inherit" component={RouterLink} to={item.to}>
                {item.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {isAuthenticated ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main', fontSize: 14 }}>
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                {user.name}
              </Typography>
              <IconButton color="inherit" onClick={logout} aria-label="logout" size="small">
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Box>
          ) : (
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              Not signed in
            </Typography>
          )}

          {/* Mobile menu */}
          {isAuthenticated && (
            <IconButton
              color="inherit"
              sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
              onClick={() => setDrawerOpen(true)}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 220 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <List>
            {visibleItems.map((item) => (
              <ListItemButton key={item.to} component={RouterLink} to={item.to}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
