import React, { useState, useContext, useEffect } from 'react'
import { AppBar, List, Drawer, Toolbar, IconButton, Grid,Typography, Stack, Button, Menu, MenuItem, Card, CardContent, CardActionArea, Box, Divider } from '@mui/material'
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
import ViewContext from '../context/View'
import TemaContext, { lightTheme, darkTheme } from '../context/Tema';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import StoreIcon from '@mui/icons-material/Store';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import KitchenIcon from '@mui/icons-material/Kitchen';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import BookIcon from '@mui/icons-material/Book';
import ProductContext from '../context/Products';

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

export const AnaEkran = () => {
  const { data, isError, isLoading, fetchProducts } = useContext(ProductContext);
  const [storeStatus, setStoreStatus] = useState('Checking...');
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
  const navigate = useNavigate();
 
  useEffect(() => {
    fetchVersionFromMockService();
    fetchUserData();
  }, []);

  const { theme } = useContext(TemaContext);
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  const muiTheme = useTheme(); 
  const categories = ['All', 'Meyve', "Sebze", 'Süt Ürünleri', 'İçecek', 'Atıştırmalık', 'Temel Gıda', 'Fırından', 'Et Ürünleri', 'Dondurulmuş Gıda', 'Dondurma', 'Hazır Gıda', 'Kuruyemiş', 'Tatlı', 'Temizlik', 'Kişisel Bakım'];

  const CategoryItem = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fff',
    color: theme.palette.mode === 'dark' ? '#fff' : '#333',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[2],
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' ? '#555' : '#f0f0f0',
    },
  }));
  useEffect(() => {
    const fetchStoreStatus = async () => {
      try {
        const response = await fetch('/heartbeat');
        console.log('Response:', response);
        if (response.status === 200) {
          const data = await response.json();
          console.log('Data:', data);
          setStoreStatus(data.message === 'Servis ayakta' ? 'Mağaza Çevrimiçi' : 'Mağaza Çevrimdışı');
        } else {
          setStoreStatus('Mağaza Çevrimdışı');
        }
      } catch (error) {
        console.error('Error fetching store status:', error);
        setStoreStatus('Mağaza durumu kontrol edilemedi');
      }
    };
  
    fetchStoreStatus();  // İlk kontrolü yap
    const intervalId = setInterval(fetchStoreStatus, 10000);
  
    return () => clearInterval(intervalId);
  }, []);
  
  const renderCategories = () => {
    return categories.map((category, index) => (
      <Grid item xs={6} sm={4} md={3} key={index}>
        <CategoryItem onClick={() => navigate(`/category/${category}`)}>
          {category}
        </CategoryItem>
      </Grid>
    ));
  };
  const tarih = new Date();

  return (
    <MuiThemeProvider theme={currentTheme}>
      <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
        <StyledAppBar position="fixed" open={isOpen} >
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Card sx={{ minWidth: 120, backgroundColor: '#bdbdbd', borderRadius: 5 }}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Version: {version}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Kullanıcı Kodu: {userData}
                  </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
                    Durum: {storeStatus}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tarih.toLocaleDateString()}
                  </Typography> */}
                </CardContent>
              </Card>
            </Box>
          </Toolbar>
        </StyledAppBar>

        <StyledDrawer variant="permanent" open={isOpen}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {muiTheme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
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
          <Grid container spacing={3}>
            {renderCategories()}
          </Grid>
        </Box>
      </Box>
    </MuiThemeProvider>
  );
}
