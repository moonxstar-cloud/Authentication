// import * as React from 'react';
// import GlobalStyles from '@mui/joy/GlobalStyles';
// import Avatar from '@mui/joy/Avatar';
// import Box from '@mui/joy/Box';
// import Divider from '@mui/joy/Divider';
// import IconButton from '@mui/joy/IconButton';
// import List from '@mui/joy/List';
// import ListItem from '@mui/joy/ListItem';
// import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
// import ListItemContent from '@mui/joy/ListItemContent';
// import Typography from '@mui/joy/Typography';
// import Sheet from '@mui/joy/Sheet';
// import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
// import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
// import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
// import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
// import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
// import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
// import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
// import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
// import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import { useState,useEffect } from 'react';
// import axios from 'axios';
// import ColorSchemeToggle from '../ColorSchemeToggle';
// import { closeSidebar } from '../utils/utils';
// import { useAuth } from '../../context/AuthContext';
// function Toggler({ renderToggle,children }) {
//   const [open, setOpen] = React.useState();
//   return (
//     <React.Fragment>
//       {renderToggle({ open, setOpen })}
//       <Box
//         sx={[
//           {
//             display: 'grid',
//             transition: '0.2s ease',
//             '& > *': {
//               overflow: 'hidden',
//             },
//           },
//           open ? { gridTemplateRows: '1fr' } : { gridTemplateRows: '0fr' },
//         ]}
//       >
//         {children}
//       </Box>
//     </React.Fragment>
//   );
// }

// export default function Sidebar() {
//   // const { user } = useAuth(); 
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch user data when the component mounts
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:5000/api/auth/me', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(response.data);
//       } catch (error) {
//         console.error('Failed to fetch user data:', error);
//         setError('Failed to fetch user data. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (loading) {
//     return <Typography>Loading...</Typography>;
//   }

//   if (error) {
//     return <Typography color="danger">{error}</Typography>;
//   }

//   return (
//     <Sheet
//       className="Sidebar"
//       sx={{
//         position: { xs: 'fixed', md: 'sticky' },
//         transform: {
//           xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
//           md: 'none',
//         },
//         transition: 'transform 0.4s, width 0.4s',
//         zIndex: 10000,
//         height: '100dvh',
//         width: 'var(--Sidebar-width)',
//         top: 0,
//         p: 2,
//         flexShrink: 0,
//         display: 'flex',
//         flexDirection: 'column',
//         gap: 2,
//         borderRight: '1px solid',
//         borderColor: 'divider',
//       }}
//     >
//       <GlobalStyles
//         styles={(theme) => ({
//           ':root': {
//             '--Sidebar-width': '220px',
//             [theme.breakpoints.up('lg')]: {
//               '--Sidebar-width': '240px',
//             },
//           },
//         })}
//       />
//       <Box
//         className="Sidebar-overlay"
//         sx={{
//           position: 'fixed',
//           zIndex: 9998,
//           top: 0,
//           left: 0,
//           width: '100vw',
//           height: '100vh',
//           opacity: 'var(--SideNavigation-slideIn)',
//           backgroundColor: 'var(--joy-palette-background-backdrop)',
//           transition: 'opacity 0.4s',
//           transform: {
//             xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
//             lg: 'translateX(-100%)',
//           },
//         }}
//         onClick={() => closeSidebar()}
//       />
//        <ColorSchemeToggle sx={{ ml: 'auto' }} />
//   {/* User Info at the Top */}
//   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center',mt:2}}>
//   {/* Profile Picture */}
//   <Avatar
//     variant="outlined"
//     size="lg"
//     src={`http://localhost:5000/${user.profilePicture}` || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286'}
//     sx={{
//       width: 100, // Increase the width
//       height: 100, // Increase the height
//       border: '3px solid', // Add a border
//       borderColor: 'primary.500', // Use a primary color for the border
//       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', // Add a shadow effect
//     }}
//   />

//   {/* Username */}
//   <Typography level="title-lg" sx={{ textAlign: 'center' }}>
//     {user?.name || 'User Name'}
//   </Typography>

//   {/* Email */}
//   <Typography level="body-sm" sx={{ textAlign: 'center' }}>
//     {user?.email || 'user@example.com'}
//   </Typography>

//   {/* Logout Button */}
//   <IconButton size="sm" variant="plain" color="neutral">
   
//   </IconButton>
// </Box>

      
//       <Box
//         sx={{
//           minHeight: 0,
//           overflow: 'hidden auto',
//           flexGrow: 1,
//           display: 'flex',
//           flexDirection: 'column',
//           [`& .${listItemButtonClasses.root}`]: {
//             gap: 1.5,
//           },
//         }}
//       >
//         <List
//           size="sm"
//           sx={{
//             gap: 1,
//             '--List-nestedInsetStart': '30px',
//             '--ListItem-radius': (theme) => theme.vars.radius.sm,
//           }}
//         >
//           <ListItem>
//             <ListItemButton>
//               <HomeRoundedIcon />
//               <ListItemContent>
//                 <Typography level="title-sm">Home</Typography>
//               </ListItemContent>
//             </ListItemButton>
//           </ListItem>

//           <ListItem>
//             <ListItemButton>
//               <DashboardRoundedIcon />
//               <ListItemContent>
//                 <Typography level="title-sm">Dashboard</Typography>
//               </ListItemContent>
//             </ListItemButton>
//           </ListItem>

//           <ListItem>
//             <ListItemButton
//               role="menuitem"
//               component="a"
//               href="/joy-ui/getting-started/templates/order-dashboard/"
//             >
//               <ShoppingCartRoundedIcon />
//               <ListItemContent>
//                 <Typography level="title-sm">Orders</Typography>
//               </ListItemContent>
//             </ListItemButton>
//           </ListItem>
//           <ListItem nested>
//             <Toggler
//               renderToggle={({ open, setOpen }) => (
//                 <ListItemButton onClick={() => setOpen(!open)}>
//                   <AssignmentRoundedIcon />
//                   <ListItemContent>
//                     <Typography level="title-sm">Tasks</Typography>
//                   </ListItemContent>
//                   <KeyboardArrowDownIcon
//                     sx={[
//                       open ? { transform: 'rotate(180deg)' } : { transform: 'none' },
//                     ]}
//                   />
//                 </ListItemButton>
//               )}
//             >
//               <List sx={{ gap: 0.5 }}>
//                 <ListItem sx={{ mt: 0.5 }}>
//                   <ListItemButton>All tasks</ListItemButton>
//                 </ListItem>
//                 <ListItem>
//                   <ListItemButton>Backlog</ListItemButton>
//                 </ListItem>
//                 <ListItem>
//                   <ListItemButton>In progress</ListItemButton>
//                 </ListItem>
//                 <ListItem>
//                   <ListItemButton>Done</ListItemButton>
//                 </ListItem>
//               </List>
//             </Toggler>
//           </ListItem>
//           <ListItem>
            
//           </ListItem>
//           <ListItem nested>
//             <Toggler
//               defaultExpanded
//               renderToggle={({ open, setOpen }) => (
//                 <ListItemButton onClick={() => setOpen(!open)}>
//                   <GroupRoundedIcon />
//                   <ListItemContent>
//                     <Typography level="title-sm">Users</Typography>
//                   </ListItemContent>
//                   <KeyboardArrowDownIcon
//                     sx={[
//                       open ? { transform: 'rotate(180deg)' } : { transform: 'none' },
//                     ]}
//                   />
//                 </ListItemButton>
//               )}
//             >
//               <List sx={{ gap: 0.5 }}>
//                 <ListItem sx={{ mt: 0.5 }}>
//                   <ListItemButton selected>My profile</ListItemButton>
//                 </ListItem>
                
//               </List>
//             </Toggler>
//           </ListItem>
//         </List>
//         <List
//           size="sm"
//           sx={{
//             mt: 'auto',
//             flexGrow: 0,
//             '--ListItem-radius': (theme) => theme.vars.radius.sm,
//             '--List-gap': '8px',
//             mb: 2,
//           }}
//         >
//           <ListItem>
//             <ListItemButton>
//               <SupportRoundedIcon />
//               Support
//             </ListItemButton>
//           </ListItem>
//           <ListItem>
//             <ListItemButton>
//               <SettingsRoundedIcon />
//               Settings
//             </ListItemButton>
//           </ListItem>
//         </List>
        
//       </Box>
//       <Divider />
//       <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
//         <Avatar
//           variant="outlined"
//           size="sm"
//           src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
//         />
//         <Box sx={{ minWidth: 0, flex: 1 }}>
//         <Typography level="title-sm">{user?.name || 'User Name'}</Typography>
//         <Typography level="body-xs">{user?.email || 'user@example.com'}</Typography>
//         </Box>
//         <IconButton size="sm" variant="plain" color="neutral">
//           <LogoutRoundedIcon />
//         </IconButton>
//       </Box>
//     </Sheet>
//   );
// }
import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import ColorSchemeToggle from '../ColorSchemeToggle';
import { closeSidebar } from '../utils/utils';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

function Toggler({ renderToggle, children }) {
  const [open, setOpen] = React.useState();
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={[
          {
            display: 'grid',
            transition: '0.2s ease',
            '& > *': {
              overflow: 'hidden',
            },
          },
          open ? { gridTemplateRows: '1fr' } : { gridTemplateRows: '0fr' },
        ]}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();
  // Use the AuthContext to get the user data
  const { user, logout ,loading} = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);
 

  // Handle logout function
  const handleLogout = () => {
    logout();
    // You might want to redirect to login page here
    navigate("/login")
  };

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <ColorSchemeToggle sx={{ ml: 'auto' }} />
      {/* User Info at the Top */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center', mt: 2 }}>
        {/* Profile Picture */}
        <Avatar
          variant="outlined"
          size="lg"
          src={user.profilePicture ? `http://localhost:5000/${user.profilePicture}` : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286'}
          sx={{
            width: 100, // Increase the width
            height: 100, // Increase the height
            border: '3px solid', // Add a border
            borderColor: 'primary.500', // Use a primary color for the border
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', // Add a shadow effect
          }}
        />

        {/* Username */}
        <Typography level="title-lg" sx={{ textAlign: 'center' }}>
          {user?.name || 'User Name'}
        </Typography>

        {/* Email */}
        <Typography level="body-sm" sx={{ textAlign: 'center' }}>
          {user?.email || 'user@example.com'}
        </Typography>
      </Box>

      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton>
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Home</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <DashboardRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Dashboard</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              role="menuitem"
              component="a"
              href="/joy-ui/getting-started/templates/order-dashboard/"
            >
              <ShoppingCartRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Orders</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <AssignmentRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Tasks</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={[
                      open ? { transform: 'rotate(180deg)' } : { transform: 'none' },
                    ]}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton>All tasks</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Backlog</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>In progress</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Done</ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
          <ListItem nested>
            <Toggler
              defaultExpanded
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <GroupRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Users</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={[
                      open ? { transform: 'rotate(180deg)' } : { transform: 'none' },
                    ]}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton selected>My profile</ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
        </List>
        <List
          size="sm"
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
            '--List-gap': '8px',
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton>
              <SupportRoundedIcon />
              Support
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <SettingsRoundedIcon />
              Settings
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar
          variant="outlined"
          size="sm"
          src={user.profilePicture ? `http://localhost:5000/${user.profilePicture}` : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286'}
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">{user?.name || 'User Name'}</Typography>
          <Typography level="body-xs">{user?.email || 'user@example.com'}</Typography>
        </Box>
        <IconButton size="sm" variant="plain" color="neutral" onClick={handleLogout}>
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}