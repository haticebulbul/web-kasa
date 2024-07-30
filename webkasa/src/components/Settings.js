import React, { useContext } from 'react';
import {
  Box, Card, CardContent, IconButton, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Typography, Divider, Toolbar, List, Tooltip, Paper, Grid, Container
} from '@mui/material';
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
import { useTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ViewContext from '../context/View';
import TemaContext, { lightTheme, darkTheme } from '../context/Tema';



const Settings = () => {
  const navigate = useNavigate();
  const { isOpen, version, userData, handleDrawerOpen, handleDrawerClose, handleLogout, DrawerHeader, StyledAppBar, StyledDrawer } = useContext(ViewContext);
  const { theme, toggleTheme, backgroundColor } = useContext(TemaContext);
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  const muiTheme = useTheme();

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
              Ayarlar
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Card sx={{
                minWidth: 120,
                margin: 1,
                backgroundColor: theme === 'light' ? backgroundColor : '#333',
                borderRadius: 8,
              }}>
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
            {['Anasayfa', 'Satış'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => {
                    if (text === 'Anasayfa') {
                      navigate('/AnaEkran');
                    } else if (text === 'Satış') {
                      navigate('/SaleScreen');
                    }
                  }}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#616161',
                    },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    height: '56px', // AppBar height
                  }}
                >
                  <ListItemIcon>
                    {text === 'Anasayfa' ? <HomeIcon /> : <PointOfSaleIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{ flexGrow: 1 }} />
          <List>
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
            <ListItem key="logout" disablePadding>
              <ListItemButton
                onClick={handleLogout}
                sx={{ '&:hover': { backgroundColor: '#616161' } }}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Çıkış Yap" />
              </ListItemButton>
            </ListItem>
          </List>
        </StyledDrawer>

        <Box sx={{ flexGrow: 1, p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: theme === 'dark' ? '#121212' : '#B0BEC5', minHeight: '100vh' }}>
          <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 2, margin: 'auto', maxWidth: 300, borderRadius: '12px' }}>
              <Grid container direction="column" alignItems="center" justifyContent="center">
                <Tooltip title={theme === 'light' ? "Koyu Temaya Geç" : "Açık Temaya Geç"} arrow>
                  <IconButton onClick={toggleTheme} sx={{ mb: 1 }}>
                    {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                  </IconButton>
                </Tooltip>
                <Typography variant="body1" sx={{ textAlign: 'center' }}>
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
