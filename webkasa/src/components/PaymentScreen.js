import React, { useState, useContext, useEffect } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Box, Card, CardContent, Divider, List, ListItem,
  ListItemButton, ListItemIcon, ListItemText, Grid, Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import ViewContext from '../context/View';
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

const StyledAppBar = styled(AppBar, {
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

const PaymentScreen = () => {
  const [input, setInput] = useState('');
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

  const handleKeyPress = (key) => {
    if (key === 'Sil') {
      setInput(input.slice(0, -1));
    } else if (key === 'Onayla') {
      alert(`Girdiğiniz değer: ${input}`);
    } else {
      setInput(input + key);
    }
  };

  const handlePaymentMethod = (method) => {
    alert(`Seçilen ödeme yöntemi: ${method}`);
  };

  const keys = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '0', 'Sil', 'Onayla'
  ];

  const paymentMethods = [
    'Kredi Kartı', 'Nakit', 'E-Fatura',
    'Belge Bitir', 'Belge İptal', 'Sanal Ödeme'
  ];

  return (
    <MuiThemeProvider theme={currentTheme}>
      <Box sx={{ display: 'flex', bgcolor: 'background.default', height: '100vh' }}>
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
              Payment Screen
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
          <Grid container spacing={2} sx={{ height: '100%' }}>
            <Grid item xs={4} md={4} sx={{ backgroundColor: '#bdbdbd', height: '100%' }}>
              {/* Tuş takımı için boş alan */}
            </Grid>
            <Grid item xs={8} md={8} sx={{ backgroundColor: '#bcaaa4', height: '100%' }}>
              <Box sx={{ mb: 2, fontSize: '2rem', textAlign: 'center' }}>{input}</Box>
              <Grid container spacing={1}>
                {keys.map((key, index) => (
                  <Grid item xs={4} key={index}>
                    <Button
                      variant="contained"
                      fullWidth
                       onClick={() => handleKeyPress(key)}
                      sx={{ backgroundColor: '#6d4c41', color: '#333' }}
                    >
                      {key}
                    </Button>
                  </Grid>
                ))}
              </Grid>
              <Grid container spacing={1} sx={{ mt: 2 }}>
                {paymentMethods.map((method, index) => (
                  <Grid item xs={6} key={index}>
                    <Button
                      variant="outlined"
                      fullWidth
                      // onClick={() => handlePaymentMethod(method)}
                    >
                      {method}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </MuiThemeProvider>
  );
};

export default PaymentScreen;
