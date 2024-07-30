
import React, { createContext, useState } from 'react';
import { createTheme } from '@mui/material/styles'; 

const TemaContext = createContext({
    backgroundColor: '#B0BEC5',
    setBackgroudColor: () => {}, 
  });

  export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#B0BEC5", 
      paper: "#fff",       
    },
  },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
          default: '#121212',
          paper: "#333", 
        },
      },});

export const TemaProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [backgroundColor, setBackgroundColor] = useState('#B0BEC5');

const toggleTheme = () => { 
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  const setBackgroudColor = (color) => {
    setBackgroundColor(color);
  };
  return (
    <TemaContext.Provider value={{ theme, toggleTheme,backgroundColor, setBackgroudColor }}>
      {children}
    </TemaContext.Provider>
  );
};

export default TemaContext; 
