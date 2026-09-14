import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// Isolates a failing remote so the rest of the app keeps working.
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Prefixed with the remote name for faster triage.
    console.error(`[MFE ERROR] ${this.props.name} failed to load/render:`, error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert severity="error" sx={{ my: 2 }}>
          <AlertTitle>{this.props.name} failed to load</AlertTitle>
          The rest of the app is unaffected. Check the console and Network tab -
          filter by <code>remoteEntry.js</code> to see if it's a load failure
          (remote down / wrong URL) or a runtime error (a bug inside that MFE's code).
        </Alert>
      );
    }
    return this.props.children;
  }
}
