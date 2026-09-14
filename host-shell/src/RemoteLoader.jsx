import React, { Suspense } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import ErrorBoundary from './ErrorBoundary';

// Lazy-loads a remote's exposed component with a loading + error state.
export default function RemoteLoader({ name, loader }) {
  const RemoteComponent = React.lazy(loader);
  return (
    <ErrorBoundary name={name}>
      <Suspense
        fallback={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 6 }}>
            <CircularProgress size={22} />
            <Typography color="text.secondary">Loading {name}...</Typography>
          </Box>
        }
      >
        <RemoteComponent />
      </Suspense>
    </ErrorBoundary>
  );
}
