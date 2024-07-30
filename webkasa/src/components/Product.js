import React, { useState, useContext, useEffect } from 'react';
import {
    List,Skeleton,Toolbar,CardMedia,IconButton,Typography,Stack,Button,Divider,Grid,Paper,Box,Card,CardContent,CardActions,
    Tooltip} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import ViewContext from '../context/View';
import TemaContext, { lightTheme, darkTheme } from '../context/Tema';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import ProductContext from '../context/Products';



const ProductCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '&:hover': {
        boxShadow: theme.shadows[5],
    },
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
    height: 200,
    '&:hover': {
        transform: 'scale(1.05)',
        transition: 'transform 0.3s ease-in-out',
    },
}));

export const Product = () => {
    const {
        isOpen,
        version,
        userData,
        handleDrawerOpen,
        handleDrawerClose,
        fetchVersionFromMockService,
        fetchUserData,
        handleLogout,DrawerHeader, StyledAppBar, StyledDrawer
    } = useContext(ViewContext);

    const { theme ,backgroundColor} = useContext(TemaContext);
    const currentTheme = theme === 'light' ? lightTheme : darkTheme;
    const muiTheme = useTheme();
    const navigate = useNavigate();

    const {
        isLoading,
        isError,
        data,
        fetchProducts,
        activeCategory,
        categories,
        filteredProducts,
        setActiveCategory,
        addToBasket,
    } = useContext(ProductContext);

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
                    height: '56px', 
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
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Grid container justifyContent="center">
                        <Stack direction="row" justifyContent="center" spacing={1} sx={{ mb: 2, mt:2, flexWrap: 'wrap' }}>
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    sx={{
                                        color: theme === 'light' ? 'black' : 'white', 
                                        backgroundColor: activeCategory === category ? '#bdbdbd' : 'inherit',
                                        m: 0.5
                                      }}                                >
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
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <ProductCard>
            <ProductImage
              component="img"
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
                  Barkod: {product.barcode}
                </Typography>
                </Box>
                
                <Typography variant="h4">
                  {product.price}₺
                </Typography>
              
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Tooltip title="Ürünü ekle">
                <Button size="small" onClick={() => handleAddToBasket(product)}>
                  <ShoppingCartIcon /> Ekle
                </Button>
              </Tooltip>
            </CardActions>
          </ProductCard>
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
