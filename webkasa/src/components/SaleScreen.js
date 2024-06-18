import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { AppBar, List,ButtonBase,CardActionArea,CardMedia, Drawer, Toolbar, IconButton, Typography, Stack, Button, Menu, MenuItem, Card, CardContent, Box, Divider, Grid } from '@mui/material'
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
import ProductContext from '../context/Products';


const images = [
  {
    url: 'https://i.pinimg.com/564x/09/c5/00/09c50003f03127703200c00ac9173266.jpg',
    title: 'Sebze',
    width: 'calc(100% / 7)',
  },
  {
    url: 'https://i.pinimg.com/564x/bf/d8/65/bfd8654f8738bebc88fcd7c1aeed3edd.jpg',
    title: 'Meyve',
    width: 'calc(100% / 7)',
  },
  {
    url: 'https://media.istockphoto.com/id/544807136/tr/foto%C4%9Fraf/various-fresh-dairy-products.jpg?s=612x612&w=0&k=20&c=GP4A_e45-TEj5OicvY7pl_LxMTRUnByZoI-VYAIBIxQ=',
    title: 'Süt Ürünleri',
    width: 'calc(100% / 7)',
  },
  {
    url: 'https://foto.haberler.com/haber/2019/07/12/gazli-icecek-icenlere-kanser-konusunda-kotu-h-12236189_amp.jpg',
    title: 'İçecek',
    width: 'calc(100% / 7)',
  },
  {
    url: 'https://i.pinimg.com/564x/33/56/f1/3356f1f0e84d3b51f0577102a6d7ac9c.jpg',
    title: 'Atıştırmalık',
    width: 'calc(100% / 7)',
  },
  {
    url: 'https://rekoltedunyasi.com/wp-content/uploads/2015/10/dumduz-bir-karin-icin-tuketmeniz-gereken-3-karbonhidrat-4.jpg',
    title: 'Temel Gıda',
    width: 'calc(100% / 7)',
  },
  {
    url: 'https://ekerlermutfak.com/image/cache/pasta/urun299de771d1e24baEPT-32-600x600h.JPG',
    title: 'Fırından',
    width: 'calc(100% / 7)',
  },
  {
    url: 'https://www.martico.com.tr/Dosyalar/Hizmet/beyaz-ve-kirmizi-et-urunleri_269.jpg',
    title: 'Et Ürünleri',
    width: 'calc(100% / 7)',
  },
  {
    url: 'https://www.fixgross.com.tr/images/glr/reyonlar/dondurulmus-gida-reyonu/1280x0buzluk5.jpg',
    title: 'Donmuş Gıda ',
    width: 'calc(100% / 7)',
  },
  {
    url: 'https://hisarhospital.com/wp-content/uploads/2015/08/dondurma-her-zaman-masum-olmayabilir.png',
    title: 'Dondurma',
    width: 'calc(100% / 7)',
  },
  {
    url: 'https://www.devgross.com.tr/uploads/urunler/05b0a.jpg',
    title: 'Hazır Gıda',
    width: 'calc(100% / 7)',
  },
  {
    url: 'https://i.pinimg.com/564x/94/82/56/94825628b182a7f7f606761857c773b7.jpg',
    title: 'Kuruyemiş',
    width: 'calc(100% / 7)',
  },
  {
    url: 'https://i.pinimg.com/736x/36/04/f8/3604f894120f45292b200480b7524331.jpg',
    title: 'Tatlı',
    width: 'calc(100% / 7)',
  },
  {
    url: 'https://edit.com.tr/Uploads/Contents/1226183854870.jpg',
    title: 'Temizlik',
    width: 'calc(100% / 7)',
  },
  {
    url: 'https://www.eurolab.com.tr/images/Kisisel-Bakim-Urunleri-Testleri.jpg',
    title: 'Kişisel Bakım',
    width: 'calc(100% / 7)',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 167,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));



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
      const [input, setInput] = useState('');
      const { isLoading, isError, data, fetchProducts,  activeCategory,categories,filteredProducts,setActiveCategory,basket } = useContext(ProductContext);

      const { theme } = useContext(TemaContext);
      const currentTheme = theme === 'light' ? lightTheme : darkTheme;
      const muiTheme = useTheme(); 
      const navigate = useNavigate();
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
      const handleCategoryClick = (category) => {
        setActiveCategory(category);
        navigate('/products');
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
       <Paper sx={{width:"auto" , height:500 , margin: "0 16px",backgroundColor:"#cfd8dc" }} elevation={7} >
       <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {images.map((image) => (
         
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
          onClick={() => handleCategoryClick(image.title)}
       
          >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>



       </Paper>





      </Grid>
      <Grid item xs={6} container sx={{ height: '100%' }}>
  <Grid item xs={6} backgroundColor="#546e7a">
  <Paper sx={{width:"auto" , height:"100%" , margin: "0 16px",backgroundColor:"#cfd8dc" }} elevation={10} >
  {basket.map((item) => (
                        <div key={item.id} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                            <Typography variant="h6">{item.name}</Typography>
                            <Typography variant="body2">Adet: {item.quantity}</Typography>
                            <Typography variant="body1">Fiyat: ${item.price}</Typography>
                        </div>
                    ))}
    </Paper>
  </Grid>
  <Grid
    item
    xs={6}
    sx={{
      backgroundColor: '#546e7a',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Box sx={{ mb: 2, fontSize: '2rem', textAlign: 'center' }}>{input}</Box>
    <Grid container spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
      {keys.map((key, index) => (
        <Grid item xs={4} key={index}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleKeyPress(key)}
            sx={{ backgroundColor: '#eceff1', color: '#333' }}
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
            // variant="outlined"
            fullWidth
            sx={{backgroundColor:"#b0bec5"}}
            // onClick={() => handlePaymentMethod(method)}
          >
            {method}
          </Button>
        </Grid>
      ))}
    </Grid>
  </Grid>

  {/* <Grid container direction="column" alignItems="flex-end" spacing={2} style={{ marginTop: '100px' }}>
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
  </Grid> */}
</Grid>

    </Grid>
        </Box>
        </MuiThemeProvider>
  )
}
