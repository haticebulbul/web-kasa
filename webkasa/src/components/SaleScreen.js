import React, { useState, useContext, useEffect,useCallback,useMemo } from 'react'
import { Link } from 'react-router-dom';
import { AppBar,Table,TableCell,TableRow,TableBody,TableContainer,TableHead, List,ButtonBase,TextField,InputBase,InputAdornment,Checkbox, Drawer, Toolbar, IconButton, Typography, Stack, Button,Card, CardContent, Box, Divider, Grid } from '@mui/material'
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
    width: '100% !important', 
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



export const SaleScreen = () => {
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

      const { getTotalPrice ,barcode, setBasket,
         handleInputChange, handleScan, fetchProducts,fetchMoreData,
         hasMore,setActiveCategory,basket,clearBasket,removeSelectedItems,selectedItems,toggleSelectItem,
       applyPromotion,getTotalPriceWithPromotion} = useContext(ProductContext);
      
      const { theme,backgroundColor } = useContext(TemaContext);
      const currentTheme = theme === 'light' ? lightTheme : darkTheme;
      const muiTheme = useTheme(); 
      const navigate = useNavigate();
      const [quantity, setQuantity] = useState('');
      const keys = useMemo(() => ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',], []);
      const paymentMethods = [
       
        'Ödemeye Geç', 'Belge İptal', 'Satır İptal','3 al 2 öde kampanyası'
      ];


      useEffect(() => {
        fetchVersionFromMockService();
        fetchUserData();
         fetchProducts(1); 
      }, []);

     
      const handleCategoryClick = (category) => {
        setActiveCategory(category);
        navigate('/products');
      };
      const [page, setPage] = useState(1);

   
    
 
    
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handleKeyPress = (key) => {
      if (selectedItemId !== null) {
        if (key === 'Enter') return; 
        const newQuantity = key === 'C' ? '' : quantity + key;
        setQuantity(newQuantity);
        if (key !== 'C') {
          updateBasketQuantity(selectedItemId, newQuantity);
        }
      }
    };
    
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
      } else if (method === '3 al 2 öde kampanyası') {
        applyPromotion('3_for_2');
      }
    };
    const debounce = (func, wait) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
      };
    };
  
    const updateBasketQuantity = useCallback(debounce((itemId, newQuantity) => {
      setBasket(prevBasket =>
        prevBasket.map(item =>
          item.id === itemId ? { ...item, quantity: Number(newQuantity) } : item
        )
      );
    }, 300), []);
  
    const handleChange = (e) => {
      const { value } = e.target;
      if (/^\d*\.?\d*$/.test(value)) {
        setQuantity(value);
      }
    };
  return (
    <MuiThemeProvider theme={currentTheme}>
    <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'background.default', minHeight: '100vh' }}>
      <StyledAppBar position="fixed" open={isOpen}>
        <Toolbar sx={{ minHeight: '64px' }}>
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
              fontSize: '1.25rem',
              fontWeight: 'bold',
            }}
          >
            Satış Ekranı
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Card sx={{
                minWidth: 120,
                margin: 1,
                backgroundColor: theme === 'light' ? backgroundColor : '#333',
                borderRadius: 8,
              }}>        
                            <CardContent sx={{ py: 1 }}>
                <Typography variant="body2" color="text.secondary">
                Versiyon: {version}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Kullanıcı Kodu: {userData}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Toolbar>
      </StyledAppBar>
  
      <Box sx={{ display: 'flex', flexGrow: 1, pt: '72px' }}>
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
  
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          sx={{ marginTop: '10px' }}
        >
          <InputBase
            type="text"
            value={barcode}
            onChange={handleInputChange}
            placeholder="Barkod"
            sx={{
              width: '80%',
              marginBottom: '20px',
              padding: '10px',
              backgroundColor: '#fff',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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
                    cursor: 'pointer',
                  }}
                >
                  Sepete Ekle
                </button>
              </InputAdornment>
            }
          />
          <Paper
            sx={{
              width: { xs: '100%', md: 400 },
              height: 500,
              margin: "0 16px",
              backgroundColor: "#cfd8dc",
              padding: '16px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
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
              {images.map((image) => (
                <ImageButton
                  focusRipple
                  key={image.title}
                  style={{
                    width: '80px',
                    height: '80px',
                    margin: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    flexShrink: 0,
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
                        width: '100%',
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
      <Grid item xs={12} md={8}>
      <Grid container spacing={3} sx={{ height: '100%' }}>
      <Grid item xs={12} md={8} sx={{ marginTop: '10px' }}>
  <Card sx={{ height: '100%' }}>
    <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>
        Sepet
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ flex: 1, overflowY: 'auto', maxHeight: 400 }} 
        id="scrollable-table"
      >
        <InfiniteScroll
          dataLength={basket.length}
          next={fetchMoreData}
          hasMore={hasMore}
          scrollableTarget="scrollable-table"
          endMessage={<Typography variant="body2" align="center">Daha fazla ürün bulunmuyor.</Typography>}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {showCheckboxes && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selectedItems.length > 0 && selectedItems.length < basket.length}
                      checked={basket.length > 0 && selectedItems.length === basket.length}
                      onChange={(e) => toggleSelectItem(e.target.checked ? basket.map(item => item.id) : [])}
                    />
                  </TableCell>
                )}
                <TableCell>Ürün</TableCell>
                <TableCell align="right">Fiyat</TableCell>
                <TableCell align="right">Adet</TableCell>
                <TableCell align="right">Toplam</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {basket.map((item) => (
                <TableRow
                  key={item.id}
                  hover
                  role="checkbox"
                  aria-checked={selectedItems.includes(item.id)}
                  tabIndex={-1}
                  selected={selectedItems.includes(item.id)}
                  onClick={() => {
                    setSelectedItemId(item.id);
                    setQuantity('');
                  }}
                >
                  {showCheckboxes && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelectItem(item.id)}
                      />
                    </TableCell>
                  )}
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">{item.price}₺</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">{item.price * item.quantity}₺</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InfiniteScroll>
      </TableContainer>
      <Typography variant="h6" align="right" gutterBottom>Ara Toplam: {getTotalPrice().toFixed(2)}₺</Typography>
      <Typography variant="h6" align="right" gutterBottom>Toplam Fiyat: {getTotalPriceWithPromotion().toFixed(2)}₺</Typography>
    </CardContent>
  </Card>
</Grid>


      <Grid item xs={12} md={4} sx={{marginTop:'10px'}}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1} sx={{ flex: 1 }}>
              {paymentMethods.map((method) => (
                <Button
                  key={method}
                  variant="contained"
                  onClick={() => handlePaymentMethod(method)}
                  fullWidth
                  sx={{ height: '50px' }}
                >
                  {method}
                </Button>
              ))}
            </Box>
            <Divider sx={{ my: 2 }} />
            <TextField
        label="Miktar"
        variant="outlined"
        fullWidth
        value={quantity}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
            <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" gap={1}>
              {keys.map((key) => (
                <Button
                  key={key}
                  variant="outlined"
                  onClick={() => handleKeyPress(key)}
                  sx={{ width: '80px', height: '60px', marginBottom: 1 }}
                >
                  {key}
                </Button>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
      </Grid>
    </Grid>
        </Box>
      </Box>
    </Box>
  </MuiThemeProvider>
  
  
  )
}
