import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Nav from './Nav';
import RemoteLoader from './RemoteLoader';
import { useAuth } from 'sharedState/useAuth';

function Protected({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <div>
      <Nav />
      <Container maxWidth="md" sx={{ py: { xs: 3, sm: 5 } }}>
        <Routes>
          <Route
            path="/"
            element={<RemoteLoader name="Sign-In" loader={() => import('signIn/SignInApp')} />}
          />
          <Route
            path="/dashboard"
            element={
              <Protected>
                <RemoteLoader
                  name="Accounts Overview"
                  loader={() => import('accounts/AccountsApp')}
                />
              </Protected>
            }
          />
          <Route
            path="/payments"
            element={
              <Protected>
                <RemoteLoader
                  name="Fund Transfer"
                  loader={() => import('transfer/TransferApp')}
                />
              </Protected>
            }
          />
        </Routes>
      </Container>
    </div>
  );
}
