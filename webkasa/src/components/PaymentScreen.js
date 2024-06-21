import React, { useState, useContext, useEffect } from 'react';
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
import Keyboard from "react-simple-keyboard";
import 'react-simple-keyboard/build/css/index.css';

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

const StyledAppBar = styled(AppBar, {
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

const PaymentScreen = () => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'sil', 'onayla'];

  const paymentMethods = [
    'Belge Bitir', 'Belge İptal', 'Nakit', 'Kredi',
    'Satır İptal', 'E-Fatura'
  ];

  const [input, setInput] = useState('');
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
  const { basket, hasMore, fetchProducts, getTotalPrice, toggleSelectItem, setPaymentMethod, finishTransaction, setQuantity, setBasket,
    selectedItems, getTotalPriceWithPromotion, quantityInputMode, quantity, clearBasket, removeSelectedItems, partialPayments, setPartialPayments
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

  useEffect(() => {
    const remainingAmount = calculateRemainingAmount();
    setIsCheckoutEnabled(remainingAmount <= 0);
  }, [partialPayments]);

  const handleKeyPress = (key) => {
    if (key === 'sil') {
      setPaymentAmount(paymentAmount.slice(0, -1));
    } else if (key === 'onayla') {
      if (selectedMethod) {
        const amount = parseFloat(paymentAmount);
        if (!isNaN(amount) && amount > 0) {
          setPartialPayments(prev => ({
            ...prev,
            [selectedMethod]: (prev[selectedMethod] || 0) + amount,
          }));
          setPaymentAmount('');
        }
      }
    } else {
      setPaymentAmount(prev => prev + key);
    }
  };

  const handlePaymentMethod = (method) => {
    setSelectedMethod(method);

    if (method === 'Belge İptal') {
      setBasket([]); // This should now work if setBasket is defined in ProductContext
      setPartialPayments({});
      setIsCheckoutEnabled(false);
    } else if (method === 'Satır İptal') {
      setShowCheckboxes(prevShowCheckboxes => !prevShowCheckboxes);
      if (showCheckboxes) {
        removeSelectedItems();
      }
    } else if (method === 'Belge Bitir') {
      if (isCheckoutEnabled) {
        navigate('/receipt');
      }
    } else if (method === 'E-Fatura') {
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

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setKeyboardVisible(false);
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

  return (
    <MuiThemeProvider theme={currentTheme}>
      <Box sx={{ display: 'flex', bgcolor: 'background.default', height: '100vh', overflow: 'hidden' }}>
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
              sx={{ flexGrow: 1 }}
            >
              Payment Screen
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ mr: 2 }}
              >
                {version}
              </Typography>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ mr: 2 }}
              >
                {userData.username}
              </Typography>
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
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
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/AnaEkran')}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/PaymentScreen')}>
                <ListItemIcon><PaymentIcon /></ListItemIcon>
                <ListItemText primary="Payment" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/SaleScreen')}>
                <ListItemIcon><PointOfSaleIcon /></ListItemIcon>
                <ListItemText primary="Sale" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/settings')}>
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
          </List>
        </StyledDrawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, overflow: 'hidden' }}>
          <DrawerHeader />
          <Grid container spacing={3} sx={{ height: 'calc(100% - 64px)' }}>
            <Grid item xs={12} sm={6} md={8} sx={{ height: '100%' }}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" gutterBottom>
                    Products
                  </Typography>
                  <TableContainer component={Paper} sx={{ flex: 1, overflowY: 'auto' }}>
                    <InfiniteScroll
                      dataLength={basket.length}
                      next={fetchMoreData}
                      hasMore={hasMore}
                      scrollableTarget="scrollable-table"
                    >
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {showCheckboxes && (
                              <TableCell padding="checkbox">
                                <Checkbox
                                  indeterminate={selectedItems.length > 0 && selectedItems.length < basket.length}
                                  checked={basket.length > 0 && selectedItems.length === basket.length}
                                  onChange={(e) => toggleSelectItem(e.target.checked ? basket : [])}
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
                              aria-checked={selectedItems.includes(item)}
                              tabIndex={-1}
                              selected={selectedItems.includes(item)}
                            >
                              {showCheckboxes && (
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    checked={selectedItems.includes(item)}
                                    onChange={() => toggleSelectItem(item)}
                                  />
                                </TableCell>
                              )}
                              <TableCell component="th" scope="row">
                                {item.name}
                              </TableCell>
                              <TableCell align="right">{item.price}</TableCell>
                              <TableCell align="right">{item.quantity}</TableCell>
                              <TableCell align="right">{item.price * item.quantity}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </InfiniteScroll>
                  </TableContainer>
                  {/* <Typography variant="h6" align="right" gutterBottom>
                    Total: {getTotalPriceWithPromotion().toFixed(2)} 
                  </Typography> */}
                  <Typography variant="h6"align="right" gutterBottom>Ara Toplam: ${getTotalPrice().toFixed(2)}</Typography>
                  <Typography variant="h6" align="right" gutterBottom>Toplam Fiyat : ${getTotalPriceWithPromotion().toFixed(2)}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ height: '100%' }}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                 
                  <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1} sx={{ flex: 1 }}>
                    {paymentMethods.map((method) => (
                      <Button
                        key={method}
                        variant="contained"
                        color={selectedMethod === method ? 'primary' : 'secondary'}
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
                    fullWidth
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    sx={{ mb: 2 }}
                    placeholder="Enter amount"
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
                  <Typography variant="h6" align="right" gutterBottom>
                    Para Üstü: {calculateRemainingAmount().toFixed(2)} 
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Enter Email Address</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To send an electronic invoice, please enter your email address here.
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
              {keyboardVisible && (
                <Keyboard
                  onKeyPress={onKeyPress}
                  layout={{
                    default: [
                      'q w e r t y u i o p {bksp}',
                      'a s d f g h j k l {enter}',
                      'z x c v b n m @ .',
                    ],
                  }}
                  display={{
                    '{bksp}': '←',
                    '{enter}': 'Enter',
                  }}
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={toggleKeyboard} color="primary">
                {keyboardVisible ? 'Hide Keyboard' : 'Show Keyboard'}
              </Button>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleConfirmEmail} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </MuiThemeProvider>
  );
};

export default PaymentScreen;
