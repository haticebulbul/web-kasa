import React, { useState ,useContext,useEffect} from 'react'
import { AppBar,List,Drawer,Toolbar,IconButton,Typography,Stack,Button,Menu,MenuItem, Card,CardContent,Box, Divider } from '@mui/material'
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
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { navigate } from 'react-router-dom';
import  ViewContext from '../context/View'
import { Login } from './Login';
import { worker } from '../mocks/browser';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const drawerWidth = 240; // drawer genişliği
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
  const StyledAppBar  = styled(MuiAppBar, {
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
  }));
  
  const StyledDrawer  = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
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
  const images = [
    {
      label: 'San Francisco – Oakland Bay Bridge, United States',
      imgPath:
        'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
      label: 'Bird',
      imgPath:
        'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
      label: 'Bali, Indonesia',
      imgPath:
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    },
    {
      label: 'Goč, Serbia',
      imgPath:
        'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
  ];
export const AnaEkran = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

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
const theme = useTheme();
const navigate = useNavigate();
     useEffect(() => {
   
    fetchVersionFromMockService();
    fetchUserData();
  }, []); 
  
    
  return (
  
    <Box sx={{ display: 'flex' }}> 
    <StyledAppBar position="fixed"  open={isOpen} sx={{ backgroundColor: '#37474f' }}> 
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
                32 Bit
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Card sx={{ minWidth: 120 ,backgroundColor:'#bdbdbd', borderRadius: 5}}>
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
          <IconButton 
          onClick={handleDrawerClose}
          >
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Anasayfa', 'Ödeme '].map((text, index) => (
            <ListItem key={text} disablePadding>
             <ListItemButton
        onClick={() => {
          
 if (text === 'Anasayfa') {
            navigate('/AnaEkran');
          }


         else if (text === 'Ödeme') {
            navigate('/PaymentScreen');
          } 
         
        }}
        sx={{
          '&:hover': {
            backgroundColor: '#616161',
          },
        }}
      >
                        <ListItemIcon>
                            {index % 2 === 0 ? <HomeIcon /> : <PaymentIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
                
            ))}
            <ListItem key="settings" disablePadding>
    <ListItemButton 
     onClick={() => navigate('/Settings')} 
    sx={{ '&:hover': { backgroundColor: '#616161' } }}>
      <ListItemIcon>
        <SettingsIcon /> 
      </ListItemIcon>
      <ListItemText primary="Ayarlar" />
    </ListItemButton>
    
  </ListItem>        
        </List>
        <ListItem disablePadding sx={{ position: 'absolute', bottom: 0 }}>
    <ListItemButton onClick={handleLogout}   sx={{ '&:hover': { backgroundColor: '#616161' } }}>
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

    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{images[activeStep].label}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 255,
                  display: 'block',
                  maxWidth: 400,
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>

</Box>
  )
}


