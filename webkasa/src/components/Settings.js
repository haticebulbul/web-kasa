import React, { useContext, useState } from 'react';
import {
  Box,Card,CardContent,IconButton,ListItem,ListItemButton,ListItemIcon, ListItemText,Typography,Divider,Toolbar,List,Tooltip,Paper,Grid,Container,Menu,ButtonBase} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import LogoutIcon from '@mui/icons-material/Logout';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import SettingsIcon from '@mui/icons-material/Settings';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LanguageIcon from '@mui/icons-material/Language';
import { useTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom';
import ViewContext from '../context/View';
import TemaContext, { lightTheme, darkTheme } from '../context/Tema';

const drawerWidth = 240;

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

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
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : '#37474f', // AppBar background color
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
      '& .MuiDrawer-paper': {
        ...closedMixin(theme),
        marginTop: '20px', 
      },
    }),
  })
);

const Settings = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { isOpen, version, userData, handleDrawerOpen, handleDrawerClose, handleLogout } = useContext(ViewContext);
  const { theme, toggleTheme } = useContext(TemaContext);
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  const muiTheme = useTheme();

  const handleLanguageClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [dropDown, setDropDown] = useState("");

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
              Settings
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Card sx={{ minWidth: 120,margin: 1, backgroundColor: '#bdbdbd', borderRadius: 8, backgroundColor: '#f0f0f0',}}>
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
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Container maxWidth="sm">
            <Paper
              component={ButtonBase} onClick={() => setDropDown("show")}
              sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
              }}
            >
          
            </Paper>
            <Menu open={dropDown === "show"} onClose={() => setDropDown("")}>
            </Menu>
          </Container>
          <Box sx={{ my: 2 }} />
          <Container maxWidth="sm" alignItems="center"  justifyContent="center" >
          <Paper elevation={3} sx={{ p: 2, margin: 'auto', maxWidth: 300 }}>
              <Grid container alignItems="center" justifyContent="center">
                <Tooltip title={theme === 'light' ? "Koyu Temaya Geç" : "Açık Temaya Geç"}>
                  <IconButton onClick={toggleTheme}>
                    {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                  </IconButton>
                </Tooltip>

                <Typography variant="body1" sx={{ mx: 2 }}>
                  {theme === 'light' ? "Koyu Temaya Geç" : "Açık Temaya Geç"}
                </Typography>
              </Grid>
            </Paper>
          </Container>
        </Box>
      </Box>
    </MuiThemeProvider>
  );
};

export default Settings;
