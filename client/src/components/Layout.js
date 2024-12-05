import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, styled } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';

const drawerWidth = 240;

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(4),
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  marginLeft: 0,
  marginBottom: '60px',
  marginTop: '90px',
  minHeight: '100vh',
  backgroundColor: '#f8f9fa',
  transition: 'all 0.3s ease',
  maxWidth: `calc(100vw - ${drawerWidth}px)`,
}));

const StyledDrawer = styled(Drawer)(() => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    borderRight: 'none',
    background: 'linear-gradient(180deg, #1e3c72 0%, #2a5298 100%)',
    boxShadow: '4px 0 15px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    marginTop: '75px',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
}));

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'Jobs', icon: <WorkIcon />, path: '/jobs' },
  { text: 'Job Seekers', icon: <PersonIcon />, path: '/job-seeker' },
  { text: 'Employers', icon: <BusinessIcon />, path: '/employer' },
  { text: 'Interview Prep', icon: <SchoolIcon />, path: '/interview-prep' },
  { text: 'About', icon: <InfoIcon />, path: '/about' }
];

function Layout({ children }) {
  const location = useLocation();

  return (
    <Box sx={{ 
      display: 'flex',
      gap: 0,
    }}>
      <StyledDrawer variant="permanent">
        <Box sx={{ 
          overflow: 'hidden',
          mt: 1,
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
        }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                component={Link}
                to={item.path}
                sx={{
                  mb: 0.5,
                  mx: 1,
                  borderRadius: '10px',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  padding: '8px 16px',
                  backgroundColor: location.pathname === item.path 
                    ? 'rgba(255, 255, 255, 0.15)' 
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateX(5px)',
                    '& .MuiListItemIcon-root': {
                      transform: 'scale(1.2)',
                    },
                  },
                  '& .MuiListItemIcon-root': {
                    transition: 'transform 0.3s ease',
                    color: 'white',
                  },
                  '& .MuiListItemText-primary': {
                    color: 'white',
                    fontWeight: location.pathname === item.path ? '600' : '400',
                    fontSize: '0.9rem',
                  },
                }}
              >
                <ListItemIcon sx={{ 
                  color: location.pathname === item.path ? 'white' : 'primary.main'
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </StyledDrawer>
      <Main>
        <Box sx={{ 
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%'
        }}>
          {children}
        </Box>
      </Main>
    </Box>
  );
}

export default Layout; 