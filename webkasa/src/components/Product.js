import React, { useState, useContext, useEffect } from 'react';
import { AppBar, List, Drawer, Skeleton, Toolbar, CardMedia, IconButton, Typography, Stack, Button, Divider, Grid, Paper, Box, Card, CardContent, CardActions } from '@mui/material';
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
import ViewContext from '../context/View';
import TemaContext, { lightTheme, darkTheme } from '../context/Tema';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import ProductContext from '../context/Products';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

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
    })
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
   

    const { isLoading, isError, data, fetchProducts, activeCategory, categories, filteredProducts, setActiveCategory,addToBasket } = useContext(ProductContext);
   
    useEffect(() => {
        fetchVersionFromMockService();
        fetchUserData();
    }, []);
    const handleAddToBasket = (product) => {
        addToBasket(product);
        navigate('/salescreen');
    };

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
                    <Grid container justifyContent="center">
                        <Stack direction="row" justifyContent="center" spacing={1} sx={{ mb: 2 }}>
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    sx={{ color: 'black', backgroundColor: activeCategory === category ? '#bdbdbd' : 'inherit' }}
                                >
                                    {category}
                                </Button>
                            ))}
                        </Stack>
                        <Paper sx={{ width: '80%', maxHeight: 600, margin: '0 16px', overflowY: 'auto', padding: '16px' }} elevation={7}>
                            <Grid container spacing={2} justifyContent="center">
                                {isLoading ? (
                                    <Grid item xs={12}>
                                        <Skeleton variant="rectangular" height={300} />
                                    </Grid>
                                ) : isError ? (
                                    <Typography variant="body1" color="error">Error loading data</Typography>
                                ) : filteredProducts.length === 0 ? (
                                    <Typography variant="body1" color="text.secondary">No products found</Typography>
                                ) : (
                                    filteredProducts.map((product) => (
                                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                                            <Card>
                                                <CardMedia
                                                    component="img"
                                                    height="200"
                                                    image={product.image}
                                                    alt={product.name}
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h6" component="div">
                                                        {product.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {product.category}
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            ID: {product.id}
                                                        </Typography>
                                                        <Typography variant="h4">
                                                            ${product.price}
                                                        </Typography>
                                                        
                                                      


                                                    </Box>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                {product.kod && (
                                    <Typography variant="body2" color="text.secondary">
                                        Kod: {product.kod}
                                    </Typography>
                                )}
                                {product.barkod && (
                                    <Typography variant="body2" color="text.secondary">
                                        Barkod: {product.barkod}
                                    </Typography>
                                )}
                            </Box>  <Button onClick={() => handleAddToBasket(product)}>Ekle</Button>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))
                                )}
                            </Grid>
                        </Paper>
                    </Grid>
                </Box>
            </Box>
        </MuiThemeProvider>
    );
};

export default Product;
