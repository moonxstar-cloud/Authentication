
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Tabs,
  TabList,
  Tab,
  Stack,
  Card,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Button,
  IconButton,
  AspectRatio,
  CardOverflow,
  CardActions,
} from '@mui/joy';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { useAuth } from '../../context/AuthContext';

export default function MyProfile() {
  const { user, updateUserProfile } = useAuth(); // Use the auth context
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Set form data from user context when it's available
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  // Handle profile update
  const handleUpdateProfile = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }

    const formData = new FormData();
    if (name) formData.append('name', name);
    if (email) formData.append('email', email);
    if (oldPassword) formData.append('oldPassword', oldPassword);
    if (newPassword) formData.append('newPassword', newPassword);
    if (profilePicture) formData.append('profile', profilePicture);

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/auth/me', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      
      toast.success(response.data.message);
      
      // Update the user in the context
      updateUserProfile(response.data.user);
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error(error.response?.data?.error || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      // Create a preview URL
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };
  
  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ flex: 1, width: '100%' }}>
       <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <Box
        sx={{
          position: 'sticky',
          top: { sm: -100, md: -110 },
          bgcolor: 'background.body',
          zIndex: 9995,
        }}
      >
        <Box sx={{ px: { xs: 2, md: 6 } }}>
          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRoundedIcon fontSize="sm" />}
            sx={{ pl: 0 }}
          >
            <Link
              underline="none"
              color="neutral"
              href="#some-link"
              aria-label="Home"
            >
              <HomeRoundedIcon />
            </Link>
            <Link
              underline="hover"
              color="neutral"
              href="#some-link"
              sx={{ fontSize: 12, fontWeight: 500 }}
            >
              Users
            </Link>
            <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
              My profile
            </Typography>
          </Breadcrumbs>
          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            My profile
          </Typography>
        </Box>
        <Tabs defaultValue={0} sx={{ bgcolor: 'transparent' }}>
          <TabList
            tabFlex={1}
            size="sm"
            sx={{
              pl: { xs: 0, md: 4 },
              justifyContent: 'left',
              [`&& .MuiTab-root`]: {
                fontWeight: '600',
                flex: 'initial',
                color: 'text.tertiary',
                [`&.Mui-selected`]: {
                  bgcolor: 'transparent',
                  color: 'text.primary',
                  '&::after': {
                    height: '2px',
                    bgcolor: 'primary.500',
                  },
                },
              },
            }}
          >
            <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={0}>
              Settings
            </Tab>
          </TabList>
        </Tabs>
      </Box>
      <Stack
        spacing={4}
        sx={{
          display: 'flex',
          maxWidth: '800px',
          mx: 'auto',
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Personal info</Typography>
            <Typography level="body-sm">
              Customize how your profile information will appear to the networks.
            </Typography>
          </Box>
          <Divider />
          
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
          >
            <Stack direction="column" spacing={1}>
              <AspectRatio
                ratio="1"
                maxHeight={200}
                sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
              >
                <img
                    src={previewUrl || (user.profilePicture ? `http://localhost:5000/${user.profilePicture}` : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286')}
                  alt="Profile"
                />
              </AspectRatio>
              <IconButton
                aria-label="upload new picture"
                size="sm"
                variant="outlined"
                color="neutral"
                sx={{
                  bgcolor: 'background.body',
                  position: 'absolute',
                  zIndex: 2,
                  borderRadius: '50%',
                  left: 100,
                  top: 170,
                  boxShadow: 'sm',
                }}
                onClick={() => document.getElementById('profile-picture-upload').click()}
              >
                <EditRoundedIcon />
              </IconButton>
              <input
                id="profile-picture-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleProfilePictureChange}
              />
            </Stack>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    size="sm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
              </Stack>
              <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel>Email</FormLabel>
                <Input
                  size="sm"
                  type="email"
                  startDecorator={<EmailRoundedIcon />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
            </Stack>
          </Stack>
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: { xs: 'flex', md: 'none' }, my: 1  }}
          >
            <Stack direction="row" spacing={2} sx={{ flexDirection: 'column', alignItems: 'center' }}>
              <Stack direction="column" spacing={1} sx={{ position: 'relative', alignItems: 'center' }}>
                <AspectRatio
                  ratio="1"
                  maxHeight={120}
                  sx={{ flex: 1, minWidth: 120, borderRadius: '100%' , objectFit: 'cover',}}
                >
                  <img
                    src={previewUrl || (user.profilePicture ? `http://localhost:5000/${user.profilePicture}` : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286')}
                    alt="Profile"
                    style={{ width: '100%', height: '100%' }} 
                  />
                </AspectRatio>
                <IconButton
                  aria-label="upload new picture"
                  size="sm"
                  variant="outlined"
                  color="neutral"
                  sx={{
                    bgcolor: 'background.body',
                    position: 'absolute',
                    zIndex: 2,
                    borderRadius: '50%',
                    left: "70%",
                    top: "60%",
                    boxShadow: 'sm',
                  }}
                  onClick={() => document.getElementById('profile-picture-upload').click()}
                >
                  <EditRoundedIcon />
                </IconButton>
                <input
                  id="profile-picture-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleProfilePictureChange}
                />
              </Stack>
              <Stack spacing={1} sx={{ flexGrow: 1 }}>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    size="sm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
              </Stack>
            </Stack>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>Email</FormLabel>
              <Input
                size="sm"
                type="email"
                startDecorator={<EmailRoundedIcon />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          </Stack>

          
          <Divider />
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Update Password</Typography>
            <Typography level="body-sm">
              Change your password here.
            </Typography>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ my: 1, px: 2 }}>
            <FormControl>
              <FormLabel>Old Password</FormLabel>
              <Input
                size="sm"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>New Password</FormLabel>
              <Input
                size="sm"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Confirm New Password</FormLabel>
              <Input
                size="sm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
          </Stack>
        
          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral" onClick={() => {
                setName(user.name);
                setEmail(user.email);
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setProfilePicture(null);
              }}>
                Cancel
              </Button>
              <Button size="sm" variant="solid" onClick={handleUpdateProfile} disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>

       
        
      </Stack>
    </Box>
  );
}
