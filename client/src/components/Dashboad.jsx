import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Sidebar from './home/sidebar';
import Header from './Header';
import MyProfile from './home/Profile';
import { useAuth } from '../context/AuthContext';
import Typography from '@mui/joy/Typography';
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
  const { user, loading, checkAuthStatus } = useAuth();
  const navigate = useNavigate();

  // Use useEffect to fetch user data when the Dashboard mounts
  React.useEffect(() => {
    if (!user && !loading) {
      checkAuthStatus(); // Fetch user data if not already available
    }
  }, [user, loading, checkAuthStatus]);

  // Redirect to login if no user is found
  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/login'); // Redirect to login if no user is found
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
     
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Sidebar />
        <Header />
        <Box
          component="main"
          className="MainContent"
          sx={{
            pt: { xs: 'calc(12px + var(--Header-height))', md: 3 },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
            overflow: 'auto',
          }}
        >
          {user && <MyProfile />}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}