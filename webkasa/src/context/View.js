
import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import {AppBar} from '@mui/material';
const ViewContext = createContext();

export const ViewProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [version, setVersion] = useState('');
  const [userData, setUserData] = useState(null); 
  const [durumData,setDurumData] = useState('') 
  const [dialogOpen, setDialogOpen] = useState(false);  

  const navigate = useNavigate(); 
  const handleDrawerOpen = () => {
    setIsOpen(true);
  };

  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  const fetchVersionFromMockService = async () => {
    const mockApiResponse = await fetch('/version');
    const versionData = await mockApiResponse.json(); 
    setVersion(versionData.version);
  };

  const fetchUserData = () => {
    const storedUserData = localStorage.getItem('user'); 
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData); 
      setUserData(parsedUserData);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const fetchDurum = async()=>{
    try {
      const durum = await fetch('/store-status');
      const durumData = await durum.json();
      setDurumData(durumData.message);

    } catch (error) {
      console.error('Error fetching store status:', error);
  }
  }

  const handleControl = ()=>{ 
    if(durumData === 'Çevrim içi'){
      return true
    }else{
      setDialogOpen(true); 
      return false;
    }
  }
    const handleCloseDialog = () => {
    setDialogOpen(false); 
  };
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
      '& .MuiDrawer-paper': {
        ...closedMixin(theme),
        marginTop: '20px', 
      },
    }),
  }),
);
  return (
    <ViewContext.Provider
      value={{
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
        dialogOpen,
        handleCloseDialog,
        openedMixin,closedMixin,DrawerHeader,StyledAppBar,StyledDrawer
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};

export default ViewContext;
































// import { createContext } from "react";
// import { useNavigate } from 'react-router-dom';
// import { navigate } from 'react-router-dom';
// import React, { useState } from 'react'
// import { styled, useTheme } from '@mui/material/styles';
// import MuiAppBar from '@mui/material/AppBar';
// import MuiDrawer from '@mui/material/Drawer';

// const  ViewContext= createContext();

// function Provider ({children}){
//     const drawerWidth = 240; // drawer genişliği
//     const openedMixin = (theme) => ({
//         width: drawerWidth,
//         transition: theme.transitions.create('width', {
//           easing: theme.transitions.easing.sharp,
//           duration: theme.transitions.duration.enteringScreen,
//         }),
//         overflowX: 'hidden',
//       });
//     const closedMixin = (theme) => ({
//         transition: theme.transitions.create('width', {
//           easing: theme.transitions.easing.sharp,
//           duration: theme.transitions.duration.leavingScreen,
//         }),
//         overflowX: 'hidden',
//         width: `calc(${theme.spacing(7)} + 1px)`,
//         [theme.breakpoints.up('sm')]: {
//           width: `calc(${theme.spacing(8)} + 1px)`,
//         },
//       });
//       const DrawerHeader = styled('div')(({ theme }) => ({
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'flex-end',
//         padding: theme.spacing(0, 1),
//         // necessary for content to be below app bar
//         ...theme.mixins.toolbar,
//       }));
//       const StyledAppBar  = styled(MuiAppBar, {
//         shouldForwardProp: (prop) => prop !== 'open',
//       })(({ theme, open }) => ({
//         zIndex: theme.zIndex.drawer + 1,
//         transition: theme.transitions.create(['width', 'margin'], {
//           easing: theme.transitions.easing.sharp,
//           duration: theme.transitions.duration.leavingScreen,
//         }),
//         ...(open && {
//           marginLeft: drawerWidth,
//           width: `calc(100% - ${drawerWidth}px)`,
//           transition: theme.transitions.create(['width', 'margin'], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//           }),
//         }),
//       }));
      
//       const StyledDrawer  = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//         ({ theme, open }) => ({
//           width: drawerWidth,
//           flexShrink: 0,
//           whiteSpace: 'nowrap',
//           boxSizing: 'border-box',
//           ...(open && {
//             ...openedMixin(theme),
//             '& .MuiDrawer-paper': openedMixin(theme),
//           }),
//           ...(!open && {
//             ...closedMixin(theme),
//             '& .MuiDrawer-paper': closedMixin(theme),
//           }),
//         }),
//       );
//       const navigate = useNavigate();
//       const [isOpen, setIsOpen]= useState(false);

//       const theme = useTheme();
//             const handleDrawerOpen = () => {
//           setIsOpen(true);
//         };
      
//         const handleDrawerClose = () => {
//           setIsOpen(false);
//         };


//   const sharedValuesAndMethods={
//     drawerWidth,
//     openedMixin,
//     closedMixin,
//     DrawerHeader,
//     StyledAppBar,
//     StyledDrawer,
//     navigate,
//     theme,
//     handleDrawerOpen,




//   }

//     return (
//         <ViewContext.Provider value={{sharedValuesAndMethods}}>
//             {children}
//         </ViewContext.Provider>
//     )
// }

// export {Provider}
// export default ViewContext;
