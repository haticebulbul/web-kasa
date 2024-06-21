import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { AppBar,Table,TableCell,TableRow,TableBody,TableContainer,TableHead, List,ButtonBase,CardActionArea,InputBase,InputAdornment,Checkbox, Drawer, Toolbar, IconButton, Typography, Stack, Button, Menu, MenuItem, Card, CardContent, Box, Divider, Grid } from '@mui/material'
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
import InfiniteScroll from 'react-infinite-scroll-component';
import '../App.css';

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
      const { getTotalPrice ,barcode,handleBarcodeScan, 
        setBarcode, handleInputChange, handleScan, fetchProducts,
         hasMore,setActiveCategory,basket,adjustProductQuantity ,setQuantityInputMode,quantityInputMode
         ,currentProductId,setCurrentProductId,clearBasket,removeSelectedItems,selectedItems,toggleSelectItem,
       applyPromotion,getTotalPriceWithPromotion,handleKeyPress,handleRowClick} = useContext(ProductContext);
      
      const { theme } = useContext(TemaContext);
      const currentTheme = theme === 'light' ? lightTheme : darkTheme;
      const muiTheme = useTheme(); 
      const navigate = useNavigate();
      const [quantity, setQuantity] = useState('');
      const [inputMode, setInputMode] = useState('barcode');
      const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'C', 'Enter']
      const paymentMethods = [
       
        'Ödemeye Geç', 'Belge İptal', 'Satır İptal','Kampanyalar'
      ];
      useEffect(() => {
        fetchVersionFromMockService();
        fetchUserData();
      }, []);

      // const handleKeyPress = (key) => {
      //   if (key === 'C') {
      //     if (quantityInputMode) {
      //       setQuantity('');
      //     } else {
      //       setBarcode('');
      //     }
      //   } else if (key === 'Enter') {
      //     if (quantityInputMode) {
      //       adjustProductQuantity(currentProductId, parseInt(quantity, 10));
      //       setQuantity('');
      //       setQuantityInputMode(false);
      //       setCurrentProductId(null);
      //     } else {
      //       handleBarcodeScan(barcode);
      //     }
      //   } else {
      //     if (quantityInputMode) {
      //       setQuantity((prev) => prev + key);
      //     } else {
      //       setBarcode((prev) => prev + key);
      //     }
      //   }
      // };
    //   const handleKeyPress = (key) => {
    //     if (key === 'C') {
    //         setQuantity('');
    //         setQuantityInputMode(false);
    //         setCurrentProduct(null);
    //     } else if (key === 'Enter') {
    //         adjustProductQuantity(currentProduct.id, parseInt(quantity, 10));
    //         setQuantity('');
    //         setQuantityInputMode(false);
    //         setCurrentProduct(null);
    //     } else {
    //         setQuantity((prev) => prev + key);
    //     }
    // };
      const handleCategoryClick = (category) => {
        setActiveCategory(category);
        navigate('/products');
      };
      const [page, setPage] = useState(1);

         const fetchMoreData = () => {
        fetchProducts(page + 1);
        setPage(page + 1);
    };
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [showPromotionOptions, setShowPromotionOptions] = useState(false);

    const handlePaymentMethod = (method) => {
      if (method === 'Belge İptal') {
        clearBasket();
      } else if (method === 'Satır İptal') {
        setShowCheckboxes(prevShowCheckboxes => !prevShowCheckboxes);
        if (showCheckboxes) {
          removeSelectedItems();
        }
      } else if (method === 'Ödemeye Geç') {
        navigate("/paymentscreen");
      } else if (method === 'Kampanyalar') {
        applyPromotion('3_for_2');
      }
    };
    const [open, setOpen] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [barcodeDialogOpen, setBarcodeDialogOpen] = useState(false);
  
    const handleClose = () => {
      setOpen(false);
      setKeyboardVisible(false);
      setBarcodeDialogOpen(false);
    };
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handleConfirmEmail = () => {
      console.log('Entered email:', email);
      handleClose();
    };
  
    const toggleKeyboard = () => {
      setKeyboardVisible(!keyboardVisible);
    };
  
    const onKeyPress = (button) => {
      if (button === '{enter}') {
        handleConfirmEmail();
      } else if (button === '{bksp}') {
        setEmail(prevEmail => prevEmail.slice(0, -1));
      } else {
        setEmail(prevEmail => prevEmail + button);
      }
    };
  
    const handleBarcodeChange = (event) => {
      setBarcode(event.target.value);
    };
  
    const handleConfirmBarcode = () => {
      console.log('Entered barcode:', barcode);
      handleClose();
    };
  
    const onBarcodeKeyPress = (button) => {
      if (button === '{enter}') {
        handleConfirmBarcode();
      } else if (button === '{bksp}') {
        setBarcode(prevBarcode => prevBarcode.slice(0, -1));
      } else {
        setBarcode(prevBarcode => prevBarcode + button);
      }
    };
 
   
  return (
    <MuiThemeProvider theme={currentTheme}>

    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}> 
    <StyledAppBar position="fixed" open={isOpen}>
  <Toolbar sx={{ minHeight: '64px' }}> {/* Appbar'ın sabit yüksekliğini ayarla */}
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
        fontSize: '1.25rem', // Başlık font boyutu
        fontWeight: 'bold', // Kalın font
      }}
    >
      Satış Ekranı
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Card sx={{ minWidth: 120, backgroundColor: '#bdbdbd', borderRadius: 5 }}>
        <CardContent sx={{ py: 1 }}> {/* İçerik arasındaki boşluğu azalt */}
          <Typography variant="body2" color="text.secondary">
            <strong>Versiyon:</strong> {version}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Kullanıcı Kodu:</strong> {userData}
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
          {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
          </Box> */}

          
       

          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4}>
  {/* Kategoriler ve barkod girişi */}
  <Stack 
    display={'flex'} 
    flexDirection={'column'} 
    alignItems={'center'} 
    style={{ marginTop: '80px' }}
  >
     <InputBase
                type="text"
                value={barcode}
                onChange={handleInputChange}
                placeholder="Enter barcode"
                sx={{
                    width: '80%',
                    marginBottom: '20px',
                    padding: '10px',
                    backgroundColor: '#fff',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
                endAdornment={
                    <InputAdornment position="end">
                        <button 
                            onClick={handleScan}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#546e7a',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Sepete Ekle
                        </button>
                    </InputAdornment>
                }
            />
<Paper 
  sx={{ 
    width: 400, 
    height: 500, 
    margin: "0 16px", 
    backgroundColor: "#cfd8dc", 
    padding: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }} 
  elevation={7}
>
  <Box 
    sx={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      justifyContent: 'center', 
      alignItems: 'center',
      width: '100%',
    }}
  >
    {images.map((image, index) => (
      <ImageButton
        focusRipple
        key={image.title}
        style={{
          width: '80px', // Yeni boyut
          height: '80px', // Yeni boyut
          margin: '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          flexShrink: 0
        }}
        onClick={() => handleCategoryClick(image.title)}
      >
        <ImageSrc style={{ backgroundImage: `url(${image.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <ImageBackdrop className="MuiImageBackdrop-root" />
        <Image>
          <Typography
            component="span"
            variant="subtitle1"
            color="inherit"
            sx={{
              position: 'relative',
              p: 2,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: '#fff',
              borderRadius: '4px',
              textAlign: 'center',
              width: '100%'
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

  </Stack>
</Grid>



  <Grid item xs={8} spacing={4} container sx={{ height: '100%' }}>
    {/* Sepet ve tuş takımı */}
     <Grid item xs={8} > 
     <Paper elevation={10} style={{ marginTop: '85px', position: 'relative', height: '600px', overflowY: 'auto' }}>
          <div style={{ padding: '10px', backgroundColor: '#cfd8dc', position: 'sticky', top: 0, zIndex: 1 }}>
            <Typography variant="h4">Toplam Fiyat: ${getTotalPrice().toFixed(2)}</Typography>
            <Typography variant="h6">Toplam Fiyat with Promotion: ${getTotalPriceWithPromotion().toFixed(2)}</Typography>
          </div>
          <InfiniteScroll
            dataLength={basket.length}
            next={() => {}} // Add your function to load more data if needed
            hasMore={false} // Change if you have more data to load
            height={500}
            scrollableTarget="scrollableDiv"
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {showCheckboxes && <TableCell></TableCell>}
                    <TableCell>Ürün Adı</TableCell>
                    <TableCell>Adet</TableCell>
                    <TableCell>Fiyat</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {basket.map((item) => (
                    <TableRow key={item.id} onClick={() => toggleSelectItem(item.id)} hover>
                      {showCheckboxes && (
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedItems.includes(item.id)} />
                        </TableCell>
                      )}
                      <TableCell>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {item.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {item.quantity}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#333' }}>
                          ${item.price.toFixed(2)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </InfiniteScroll>
        </Paper>
    </Grid>
  
    <Grid
  item
  xs={4}
  sx={{
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f5f5f5', // Arka plan rengi
    padding: '16px', // Kenar boşluğu
    borderRadius: '8px', // Kenar yumuşatma
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Gölgelendirme
  }}
>
  <Box sx={{ mb: 2, fontSize: '2rem', textAlign: 'center', fontWeight: 'bold', color: '#333' }}>
  {quantityInputMode ? quantity : ''}
  </Box>
  <Paper elevation={10} sx={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px', marginBottom: '16px' }}>
  <Grid container spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
  {keys.map((key, index) => (
        <Grid item xs={4} key={index}>
          <Button
            variant="contained"
            onClick={() => handleKeyPress(key)}
            sx={{
              width: '100%',
              padding: '20px',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#fff',
              backgroundColor: '#546e7a',
              '&:hover': {
                backgroundColor: '#455a64',
              },
            }}
          >
            {key}
          </Button>
        </Grid>
      ))}
    </Grid>
  </Paper>
  <Paper elevation={10} sx={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
    <Grid container spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
      {paymentMethods.map((method, index) => (
        <Grid item xs={12} key={index}>
          <Button
            variant="contained"
            onClick={() => handlePaymentMethod(method)}
            sx={{
              width: '100%',
              padding: '10px',
              fontSize: '1rem',
              fontWeight: 'bold',
              color: '#fff',
              backgroundColor: '#37474f',
              '&:hover': {
                backgroundColor: '#263238',
              },
            }}
          >
            {method}
          </Button>
        </Grid>
      ))}
    </Grid>
  </Paper>
</Grid>

</Grid>

</Grid>
</Box>
</MuiThemeProvider>
);
};