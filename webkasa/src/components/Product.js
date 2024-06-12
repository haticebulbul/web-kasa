import React, { useState, useContext, useEffect } from 'react'
import { AppBar, List, Drawer, Toolbar,CardMedia, IconButton, Typography, Stack, Button, Menu, MenuItem, Card, CardContent, Box, Divider, Grid, Paper, ButtonBase } from '@mui/material'
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
import TemaContext, { lightTheme, darkTheme } from '../context/Tema';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
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



export const Product = () => {
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
 const [clicked, setClicked] = useState(false);
  const [count, setCount] = useState(0);

  const {showAllProducts,showProductsWithoutBarcodes,products}=useContext(ProductContext);
  const handleButtonClick = () => {
    setClicked(!clicked);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    setCount(count > 0 ? count - 1 : 0);
  };
   
    useEffect(() => {
        fetchVersionFromMockService();
        fetchUserData();
        showAllProducts();
    }, []);
// const showProductsWithoutBarcodes =()=>{
//     const filteredProducts = products.filter(product => !product.kod);
//     setProducts(filteredProducts);
// }
// const showAllProducts = ()=>{
//   fetch('/products')
//         .then(response => response.json())
//         .then(data => setProducts(data))
//         .catch(error => console.error('Error fetching products:', error));
// }
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
                            Ürünler
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
      <Grid container justifyContent="center">
        <Paper
          sx={{
            width: '80%',
            maxHeight: 600,
            margin: '0 16px',
            backgroundColor: '#cfd8dc',
            overflowY: 'auto',
            padding: '16px'
          }}
          elevation={7}
        >
          <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} sx={{ marginBottom: '16px' }}>
            <Button onClick={showAllProducts}>
              Tüm Ürünler
            </Button>
            <Button onClick={showProductsWithoutBarcodes}>
             Barkodsuz Ürünler
            </Button>
          </Stack>
          
          <Grid container spacing={2}>
            {products.map(product => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={2.4}>
      <Card sx={{ height: '100%' }} elevation={7}>
      <CardContent>
        <ButtonBase sx={{ width: '100%', height: 200 }}>
          <CardMedia
            component="img"
            image={product.image}
            // alt="iphone13"
          />
        </ButtonBase>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
          <Typography variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography variant="h6" component="div">
            {product.kod}
          </Typography>
        </Box>
       
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
          <Typography variant="body1" color="text.secondary">
            {product.price} TL
          </Typography>
          {/* {!clicked ? (
            <IconButton
              sx={{ borderRadius: '50%', width: 40, height: 40 }}
              onClick={handleButtonClick}
            >
              <AddIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                sx={{ borderRadius: '50%', width: 40, height: 40 }}
                onClick={decrementCount}
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant="body1" sx={{ margin: '0 8px' }}>
                {count}
              </Typography>
              <IconButton
                sx={{ borderRadius: '50%', width: 40, height: 40 }}
                onClick={incrementCount}
              >
                <AddIcon />
              </IconButton>
            </Box>
          )} */}
        </Box>
      </CardContent>
    </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
    </Box>
            </Box>
        </MuiThemeProvider>
    )
}
