import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Box, Card, CardContent, Divider, List, ListItem,
  ListItemButton, ListItemIcon, ListItemText, Grid, Button,
  Paper, Table, TableCell, Checkbox, TableRow, TableBody, TableContainer, TableHead,
  DialogActions, DialogContent, DialogContentText, DialogTitle, Dialog, TextField
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
import ProductContext from '../context/Products';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'react-simple-keyboard/build/css/index.css';
import { Snackbar, Alert } from '@mui/material';


const PaymentScreen = () => {
  const keys = ['1', '2', '3', 'onayla', '4', '5', '6', 'sil', '7', '8', '9', '0', ,];

  const paymentMethods = [
    'Belge İptal', 'Nakit', 'Kredi',
    'Satır İptal', 'E-Fatura'
  ];

  const {
    isOpen,
    version,
    userData,
    handleDrawerOpen,
    handleDrawerClose,
    fetchVersionFromMockService,
    fetchUserData,
    handleLogout, DrawerHeader, StyledAppBar, StyledDrawer

  } = useContext(ViewContext);

  const { theme, backgroundColor } = useContext(TemaContext);
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  const muiTheme = useTheme();
  const navigate = useNavigate();
  const { basket, hasMore, fetchProducts, getTotalPrice, toggleSelectItem,
    setQuantity, setCompletedTransactionDetails, selectedItems, getTotalPriceWithPromotion, open,
    clearBasket, removeSelectedItems, partialPayments, setPartialPayments,
    setOpen, setEmail, email, snackbarSeverity, snackbarOpen, snackbarMessage, handleCloseSnackbar, handleConfirmEmail, handleClose
  } = useContext(ProductContext);

  const [page, setPage] = useState(1);

  const fetchMoreData = () => {
    fetchProducts(page + 1);
    setPage(page + 1);
  };

  useEffect(() => {
    fetchVersionFromMockService();
    fetchUserData();
  }, []);

  const [changeAmount, setChangeAmount] = useState(null);
  const [isCheckoutEnabled, setIsCheckoutEnabled] = useState(false);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [transactionCompleted, setCompletedTransaction] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');


  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogMessage('');
  };
  useEffect(() => {
    const remainingAmount = calculateRemainingAmount();
    setIsCheckoutEnabled(remainingAmount <= 0);
  }, [partialPayments]);

  const handleKeyPress = (key) => {
    if (transactionCompleted) return;

    const totalPriceWithPromotion = getTotalPriceWithPromotion(basket);
    const totalPaid = calculateTotalPaid(partialPayments);
    const remainingAmount = totalPriceWithPromotion - totalPaid;

    if (key === 'sil') {
      setPaymentAmount(paymentAmount.slice(0, -1));
    } else if (key === 'onayla') {
      if (!selectedMethod) {
        setOpenDialog(true);
        setDialogMessage('Ödeme yöntemi seçilmedi.');
        return;
      }

      const amount = parseFloat(paymentAmount);
      if (!isNaN(amount) && amount > 0) {
        if (selectedMethod === 'Kredi' && amount > remainingAmount) {
          setOpenDialog(true);
          setDialogMessage('Kredi kartı ile ödeme yönteminde girilen miktar toplam fiyattan fazla olamaz.');
        } else if (selectedMethod === 'Nakit') {
          if (amount >= remainingAmount) {
            setPartialPayments((prev) => ({
              ...prev,
              [selectedMethod]: (prev[selectedMethod] || 0) + amount,
            }));
            setPaymentAmount('');
            setChangeAmount(amount - remainingAmount);
            handlePaymentComplete();
          } else {
            setPartialPayments((prev) => ({
              ...prev,
              [selectedMethod]: (prev[selectedMethod] || 0) + amount,
            }));
            setPaymentAmount('');
            setChangeAmount(null);
          }
        } else {
          setPartialPayments((prev) => ({
            ...prev,
            [selectedMethod]: (prev[selectedMethod] || 0) + amount,
          }));
          setPaymentAmount('');
          if (selectedMethod === 'Kredi') {
            handlePaymentComplete();
          }
        }
      }
    } else {
      const newPaymentAmount = parseFloat(paymentAmount + key);
      if (selectedMethod === 'Kredi' && newPaymentAmount > remainingAmount) {
        setOpenDialog(true);
        setDialogMessage('Kredi kartı ile ödeme yönteminde girilen miktar toplam fiyattan fazla olamaz.');
      } else {
        setPaymentAmount((prev) => prev + key);
      }
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const remainingAmount = calculateRemainingAmount();
    setIsCheckoutEnabled(remainingAmount <= 0);
  }, [partialPayments]);


  const handlePaymentMethod = (method) => {
    setSelectedMethod(method);

    if (method === 'Belge İptal') {
      clearBasket();
    } else if (method === 'Satır İptal') {
      setShowCheckboxes(prevShowCheckboxes => !prevShowCheckboxes);
      if (showCheckboxes) {
        removeSelectedItems();
      }
    }
    else if (method === 'E-Fatura') {
      setOpen(true);

    }
  };




  const calculateTotalPaid = () => {
    return Object.values(partialPayments).reduce((total, amount) => total + amount, 0);
  };

  const calculateRemainingAmount = () => {
    const totalPrice = getTotalPriceWithPromotion();
    const totalPaid = calculateTotalPaid();
    return totalPrice - totalPaid;
  };



  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };





  const receiptRef = useRef();


  const handlePaymentComplete = () => {
    const totalPriceWithPromotion = getTotalPriceWithPromotion(basket);
    const totalPaid = calculateTotalPaid(partialPayments);

    if (totalPaid >= totalPriceWithPromotion) {
      setCompletedTransactionDetails({
        basket: [...basket],
        totalPaid: totalPaid,
        totalPriceWithPromotion: totalPriceWithPromotion,
        changeAmount: totalPaid - totalPriceWithPromotion,
      });
      clearBasket();
      setPartialPayments({});
      navigate('/receipt');
    }
  };
  const handleChange = (e) => {
    const { value } = e.target;
    if (/^\d*\.?\d*$/.test(value)) {
      setPaymentAmount(value);
    }
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
                fontSize: '1.25rem',
                fontWeight: 'bold',
              }}
            >
              Ödeme Ekranı
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Card sx={{
                minWidth: 120,
                margin: 1,
                backgroundColor: theme === 'light' ? backgroundColor : '#333',
                borderRadius: 8,
              }}>              <CardContent sx={{ py: 1 }}>
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
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    height: '56px',
                  }}
                >
                  <ListItemIcon>
                    {text === 'Anasayfa' ? <HomeIcon /> : text === 'Ödeme' ? <PaymentIcon /> : <PointOfSaleIcon />}
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
          <Grid container spacing={3} sx={{ height: 'calc(100% - 64px)' }}>
            <Grid item xs={12} sm={6} md={8} sx={{ height: '100%', marginTop: '10px' }}>
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
            <Grid item xs={12} sm={6} md={4} sx={{ height: '100%', marginTop: '10px' }}>
              <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 3 }}>
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
                  <Box display="flex" justifyContent="space-around" sx={{ mb: 2 }}>
                    {paymentMethods.map((method) => (
                      <Button
                        key={method}
                        variant={selectedMethod === method ? 'contained' : 'outlined'}
                        color={selectedMethod === method ? 'primary' : 'secondary'}
                        onClick={() => handlePaymentMethod(method)}

                        sx={{
                          height: '60px',
                          width: '80px',
                          borderRadius: '10px',
                          backgroundColor: selectedMethod === method ? 'primary.main' : 'secondary.main',
                          color: selectedMethod === method ? 'white' : 'text.primary',
                          '&:hover': {
                            backgroundColor: selectedMethod === method ? 'primary.dark' : 'secondary.dark'
                          }
                        }}
                      >
                        {method}
                      </Button>
                    ))}
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <TextField
                    fullWidth
                    value={paymentAmount}
                    onChange={handleChange}
                    placeholder={getTotalPriceWithPromotion().toFixed(2)}
                    disabled={transactionCompleted}
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                  <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" gap={2}>
                    {keys.map((key) => (
                      <Button
                        key={key}
                        variant="outlined"
                        onClick={() => handleKeyPress(key)}
                        sx={{
                          width: '80px',
                          height: '60px',
                          mb: 2,
                          borderRadius: 2,
                          backgroundColor: 'background.paper',
                          color: 'text.primary',
                          '&:hover': {
                            backgroundColor: 'background.default'
                          }
                        }}
                        disabled={transactionCompleted}
                      >
                        {key}
                      </Button>
                    ))}
                  </Box>
                  <Box mt={2}>
                    {changeAmount !== null ? (
                      <Typography variant="h6" align="right" gutterBottom>
                        Para Üstü: {changeAmount.toFixed(2)} ₺
                      </Typography>
                    ) : (
                      <Typography variant="h6" align="right" gutterBottom>
                        Kalan Tutar: {calculateRemainingAmount().toFixed(2)} ₺
                      </Typography>
                    )}
                  </Box>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handlePaymentComplete}
                      disabled={!isCheckoutEnabled || transactionCompleted}
                      fullWidth
                      sx={{ height: '50px', borderRadius: 2 }}
                    >
                      Ödemeyi Tamamla
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>;


          </Grid>

          <Dialog open={openDialog} onClose={handleDialogClose}>
            <DialogTitle>Hata</DialogTitle>
            <DialogContent>
              <DialogContentText>            {dialogMessage}
              </DialogContentText>

            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Tamam
              </Button>
            </DialogActions>
          </Dialog>



          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Email Adresinizi Girin</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Elektronik faturayı göndermek için lütfen email adresinizi girin.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                value={email}
                onChange={handleEmailChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                İptal
              </Button>
              <Button onClick={handleConfirmEmail} color="primary">
                Gönder
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
              sx={{ width: '100%' }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>




          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Hata</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {dialogMessage}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Kapat
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </MuiThemeProvider>
  );
};

export default PaymentScreen;
