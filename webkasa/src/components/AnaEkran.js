import React, { useState, useContext, useEffect } from 'react'
import { AppBar, List, Drawer, Toolbar, IconButton, Grid,Typography,ButtonBase,Stack, Button, Menu, MenuItem, Card,
         CardContent, CardActionArea, Box, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,  } from '@mui/material'
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
import CircleIcon from '@mui/icons-material/Circle';

const images = [
  {
    url: 'https://i.pinimg.com/564x/09/c5/00/09c50003f03127703200c00ac9173266.jpg',
    title: 'Sebze',
    width: 'calc(100% / 5)',
  },
  {
    url: 'https://i.pinimg.com/564x/bf/d8/65/bfd8654f8738bebc88fcd7c1aeed3edd.jpg',
    title: 'Meyve',
    width: 'calc(100% / 5)',
  },
  {
    url: 'https://media.istockphoto.com/id/544807136/tr/foto%C4%9Fraf/various-fresh-dairy-products.jpg?s=612x612&w=0&k=20&c=GP4A_e45-TEj5OicvY7pl_LxMTRUnByZoI-VYAIBIxQ=',
    title: 'Süt Ürünleri',
    width: 'calc(100% / 5)',
  },
  {
    url: 'https://foto.haberler.com/haber/2019/07/12/gazli-icecek-icenlere-kanser-konusunda-kotu-h-12236189_amp.jpg',
    title: 'İçecek',
    width: 'calc(100% / 5)',
  },
  {
    url: 'https://i.pinimg.com/564x/33/56/f1/3356f1f0e84d3b51f0577102a6d7ac9c.jpg',
    title: 'Atıştırmalık',
    width: 'calc(100% / 5)',
  },
  {
    url: 'https://rekoltedunyasi.com/wp-content/uploads/2015/10/dumduz-bir-karin-icin-tuketmeniz-gereken-3-karbonhidrat-4.jpg',
    title: 'Temel Gıda',
    width: 'calc(100% / 5)',
  },
  {
    url: 'https://ekerlermutfak.com/image/cache/pasta/urun299de771d1e24baEPT-32-600x600h.JPG',
    title: 'Fırından',
    width: 'calc(100% / 5)',
  },
  {
    url: 'https://www.martico.com.tr/Dosyalar/Hizmet/beyaz-ve-kirmizi-et-urunleri_269.jpg',
    title: 'Et Ürünleri',
    width: 'calc(100% / 5)',
  },
  {
    url: 'https://www.fixgross.com.tr/images/glr/reyonlar/dondurulmus-gida-reyonu/1280x0buzluk5.jpg',
    title: 'Donmuş Gıda ',
    width: 'calc(100% / 5)',
  },
  {
    url: 'https://hisarhospital.com/wp-content/uploads/2015/08/dondurma-her-zaman-masum-olmayabilir.png',
    title: 'Dondurma',
    width: 'calc(100% / 5)',
  },
  {
    url: 'https://www.devgross.com.tr/uploads/urunler/05b0a.jpg',
    title: 'Hazır Gıda',
    width: 'calc(100% / 5)',
  },
  {
    url: 'https://i.pinimg.com/564x/94/82/56/94825628b182a7f7f606761857c773b7.jpg',
    title: 'Kuruyemiş',
    width: 'calc(100% / 5)',
  },
  {
    url: 'https://i.pinimg.com/736x/36/04/f8/3604f894120f45292b200480b7524331.jpg',
    title: 'Tatlı',
    width: 'calc(100% / 5)',
  },
  {
    url: 'https://edit.com.tr/Uploads/Contents/1226183854870.jpg',
    title: 'Temizlik',
    width: 'calc(100% / 5)',
  },
  {
    url: 'https://www.eurolab.com.tr/images/Kisisel-Bakim-Urunleri-Testleri.jpg',
    title: 'Kişisel Bakım',
    width: 'calc(100% / 5)',
  },
];

const ImageButton = styled('button')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '160px', 
  margin: '8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  borderRadius: '8px',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    '& $ImageBackdrop': {
      opacity: 0.5,
    },
    '& $ImageMarked': {
      opacity: 1,
    },
  },
}));

const ImageSrc = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'opacity 0.3s ease',
});

const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  transition: 'opacity 0.3s ease',
}));

const Image = styled('div')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
  transition: 'opacity 0.3s ease',
});

const ImageMarked = styled('div')({
  height: 3,
  width: 18,
  backgroundColor: '#fff',
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: 'opacity 0.3s ease',
  opacity: 0,
});

const ResponsiveBox = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)', 
  gap: '16px',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '16px',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)', 
  },
  [theme.breakpoints.between('md', 'lg')]: {
    gridTemplateColumns: 'repeat(4, 1fr)', 
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(5, 1fr)', 
  },
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
      '& .MuiDrawer-paper': {
        ...closedMixin(theme),
        marginTop: '40px', // AppBar ve Drawer arasındaki mesafeyi ayarlayın
      },
    }),
  }),
);

export const AnaEkran = () => {
  const {setActiveCategory } = useContext(ProductContext);
  const {
    isOpen,
    version,
    userData,
    handleDrawerOpen,
    handleDrawerClose,
    fetchVersionFromMockService,
    fetchUserData,
    handleLogout,
    fetchDurum,
    durumData,
    handleControl,
    dialogOpen,handleCloseDialog
  } = useContext(ViewContext);
  const navigate = useNavigate();
 
  useEffect(() => {
    fetchVersionFromMockService();
    fetchUserData();
    fetchDurum();
  }, []);

  const { theme } = useContext(TemaContext);
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  const muiTheme = useTheme();

  const handleCategoryClick = (category) => {
    if (handleControl()) {
     
      setActiveCategory(category);
      navigate('/products');
    }
  };


  const handleNavigation = (path) => {
    if (handleControl()) {
      navigate(path);
    }
  };

  const MainContent = styled(Box)(({ theme }) => ({
    flexGrow: 1, 
    padding: theme.spacing(3),
    marginTop: '72px',       
  }));

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
          color: 'primary.contrastText',
        }}
      >
        32 Bit
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Card
          sx={{
            minWidth: 180,
            height: 100,
            backgroundColor: '#f0f0f0',
            borderRadius: 8,
            margin: 1,
            boxShadow: 3,
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <CircleIcon
                sx={{ fontSize: 14, marginRight: 1 }}
                color={durumData === 'Çevrim içi' ? 'success' : 'error'}
              />
              {durumData}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
              Version: {version}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
              Kullanıcı Kodu: {userData}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Toolbar>
  </StyledAppBar>
        <StyledDrawer variant="permanent" open={isOpen} marginTop='80px'>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {muiTheme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List >
            {['Anasayfa', 'Ödeme', 'Satış','Ayarlar'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => {
                    if (text === 'Anasayfa') {
                      handleNavigation('/AnaEkran');
                    } else if (text === 'Ödeme') {
                      handleNavigation('/PaymentScreen');
                    } else if (text === 'Satış') {
                      handleNavigation('/SaleScreen');
                    }else if (text === 'Ayarlar') {
                      handleNavigation('/Settings');
                    }

                  }} 
                  sx={{
                    '&:hover': {
                      backgroundColor: '#616161',
                    },
                  }}
                >
                  <ListItemIcon>
                    {text === 'Anasayfa' ? <HomeIcon /> : text === 'Ödeme' ? <PaymentIcon /> : text === 'Satış' ? <PointOfSaleIcon /> : <SettingsIcon/>}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
            
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

        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Mağaza Durumu</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Mağaza şu anda çevrimdışı. Lütfen daha sonra tekrar deneyin.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Kapat
            </Button>
          </DialogActions>
        </Dialog>

        <MainContent>
        <ResponsiveBox>
      {images.map((image) => (
        <ImageButton
          key={image.title}
          onClick={() => handleCategoryClick(image.title)}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '4px',
                textAlign: 'center',
                width: '100%',
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </ResponsiveBox>
    </MainContent>
    
      </Box>
    </MuiThemeProvider>
  );
}
