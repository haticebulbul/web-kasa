import React, { useState ,useContext} from 'react'
import { AppBar,List,Drawer,Toolbar,IconButton,Typography,Stack,Button,Menu,MenuItem, Container,Box, Divider } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MuiAppBar from '@mui/material/AppBar';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PaymentIcon from '@mui/icons-material/Payment';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { navigate } from 'react-router-dom';
import  ViewContext from '../context/View'

const drawerWidth = 240; // drawer genişliği
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });
const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));
  const StyledAppBar  = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  
  const StyledDrawer  = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );
    
export const AnaEkran = () => {

 
   const navigate = useNavigate();
     const theme = useTheme();
     const [isOpen, setIsOpen]= useState(false);
     const handleDrawerOpen = () => {
         setIsOpen(true);
       };
    
      const handleDrawerClose = () => {
         setIsOpen(false);
       };

  return (
  
    <Box sx={{ display: 'flex' }}> 
    <StyledAppBar position="fixed"  open={isOpen} sx={{ backgroundColor: '#37474f' }}> 
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                    marginRight: 2,
                    ...(isOpen && { display: 'none' }),
                }}
            >
                <MenuIcon />
            </IconButton>
            <Typography
                variant="h6"
                noWrap
                component="div" 
                sx={{
                    flexGrow: 1,
                    textAlign: 'center', 
                }}
            >
                32 Bit
            </Typography>
        </Toolbar>
    </StyledAppBar>

    <StyledDrawer variant="permanent" open={isOpen}> 
    <DrawerHeader>
          <IconButton 
          onClick={handleDrawerClose}
          >
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            {['Inbox', 'Ödeme '].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton  onClick={() => {
                            console.log(`Clicked on ${text}`);
                            if (text === 'Ödeme ') {
                                navigate('/PaymentScreen');
                            }
                        }}
                    sx={{
                      '&:hover': {
                          backgroundColor: '#616161',
                      },
                  }}> 
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <PaymentIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
                
            ))}
            <ListItem key="settings" disablePadding>
    <ListItemButton 
     onClick={() => navigate('/Settings')} 
    sx={{ '&:hover': { backgroundColor: '#616161' } }}>
      <ListItemIcon>
        <SettingsIcon /> 
      </ListItemIcon>
      <ListItemText primary="Ayarlar" />
    </ListItemButton>
  </ListItem>
            
        </List>
        
      
    </StyledDrawer>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}> 
        <DrawerHeader />
       
    </Box>
</Box>
  )
}


