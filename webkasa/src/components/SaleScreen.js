import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { AppBar, List, Drawer, Toolbar, IconButton, Typography, Stack, Button, Menu, MenuItem, Card, CardContent, Box, Divider, Grid } from '@mui/material'
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
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { navigate } from 'react-router-dom';
import ViewContext from '../context/View'
import { Login } from './Login';
import { worker } from '../mocks/browser';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import TemaContext, { lightTheme, darkTheme } from '../context/Tema';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

  


const drawerWidth = 240; 
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
const StyledAppBar = styled(MuiAppBar, {
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
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : '#37474f', 
}));
const StyledDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
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
export const SaleScreen = () => {
    const {
        isOpen,
        version,
        userData,
        handleDrawerOpen,
        handleDrawerClose,
        fetchVersionFromMockService,
        fetchUserData,
        handleLogout,
      } = useContext(ViewContext);
    
      const { theme } = useContext(TemaContext);
      const currentTheme = theme === 'light' ? lightTheme : darkTheme;
      const muiTheme = useTheme(); 
      const navigate = useNavigate();
    
      useEffect(() => {
        fetchVersionFromMockService();
        fetchUserData();
      }, []);
  return (
    <MuiThemeProvider theme={currentTheme}>

    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}> 
    <StyledAppBar position="fixed" open={isOpen}>
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
              Satış Ekranı
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Card sx={{ minWidth: 120, backgroundColor: '#bdbdbd', borderRadius: 5 }}>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Version: {version}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Kullanıcı Kodu: {userData}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Toolbar>
          </StyledAppBar>
    
          <StyledDrawer variant="permanent" open={isOpen}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
            {['Anasayfa', 'Ödeme', 'Satış'].map((text, index) => (
  <ListItem key={text} disablePadding>
    <ListItemButton
      onClick={() => {
        if (text === 'Anasayfa') {
          navigate('/AnaEkran');
        } else if (text === 'Ödeme') {
          navigate('/PaymentScreen');
        } else if (text === 'Satış') {
          navigate('/SaleScreen');
        }
      }}
      sx={{
        '&:hover': {
          backgroundColor: '#616161',
        },
      }}
    >
      <ListItemIcon>
        {text === 'Anasayfa' ? <HomeIcon /> : text === 'Ödeme' ? <PaymentIcon /> : <PointOfSaleIcon />}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  </ListItem>
))}
              <ListItem key="settings" disablePadding>
                <ListItemButton
                  onClick={() => navigate('/Settings')}
                  sx={{ '&:hover': { backgroundColor: '#616161' } }}
                >
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Ayarlar" />
                </ListItemButton>
              </ListItem>
            </List>
            <ListItem disablePadding sx={{ position: 'absolute', bottom: 0 }}>
              <ListItemButton onClick={handleLogout} sx={{ '&:hover': { backgroundColor: '#616161' } }}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Çıkış Yap" />
              </ListItemButton>
            </ListItem>
          </StyledDrawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
          
          </Box>

          
       

          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={6} >
       <Stack display={'flex'} flexDirection={'row'} style={{ marginTop: '80px' }}>
   <Button component={Link} to="/products">Ürünler</Button>
    <Button>Kategoriler</Button>
    <Button >Barkodsuz Ürünler</Button>

       </Stack>
       <Paper sx={{width:"auto" , height:500 , margin: "0 16px",backgroundColor:"#cfd8dc" }} elevation={7} ></Paper>
      </Grid>
      <Grid item xs={6} backgroundColor="black">
        <Grid container direction="column" alignItems="flex-end" spacing={2} style={{ marginTop: '100px' }}>
          <Grid item>
            <Grid container justifyContent="flex-end">
              <Grid item style={{ backgroundColor: 'white', padding: '10px' }}>
                <Button>Fiyat Gör</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justifyContent="flex-end">
              <Grid item style={{ backgroundColor: 'white', padding: '10px' }}>
                <Button>Belge İptal</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justifyContent="flex-end">
              <Grid item style={{ backgroundColor: 'white', padding: '10px' }}>
                <Button>Satır İptal</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justifyContent="flex-end">
              <Grid item style={{ backgroundColor: 'white', padding: '10px' }}>
                <Button>tıkla</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
        </Box>
        </MuiThemeProvider>
  )
}
