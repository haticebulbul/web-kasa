import {Box,Grid ,Typography,FormControl,OutlinedInput,InputAdornment,Button,InputLabel} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import React, { useState, useRef ,useEffect} from 'react';
import ReactDOM from "react-dom"; // ReactDOM'u içe aktarır
import { worker } from '../mocks/browser';
import '../App.css'; 
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Keyboard from "react-simple-keyboard";
import { Dialog,Select, MenuItem,DialogTitle, DialogContent } from '@mui/material';
import 'react-simple-keyboard/build/css/index.css';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import layout from "simple-keyboard-layouts/build/layouts/turkish";
import turkishLayout from "simple-keyboard-layouts/build/layouts/turkish";
import englishLayout from "simple-keyboard-layouts/build/layouts/english";


export const Login = () => {
  
  const [version, setVersion] = useState('');
  const [login, setLogin] = useState('');
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false); // Klavyenin görünürlüğünü tutan durum değişkeni
  const inputKeyboard = useRef(null);
  const passwordKeyboard = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false); //Kullanıcı kodu 
  const [isModalOpen2, setIsModalOpen2] = useState(false); // Şifre için modal
  const [password, setPassword] = useState('');
  const [layoutName, setLayoutName] = useState('default'); // Varsayılan düzen
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState('tr'); // Varsayılan dil Türkçe
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
   
    worker.start().then(() => { 
      fetch('/version')
        .then(response => response.json())
        .then(data => setVersion(data.version));
    });
    return () => worker.stop(); 
  }, []); 


  

  const loginekran = async () => {

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kullaniciKodu: String(input), 
          sifre: password
        }),
      });
// debugger
      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('user', userData); // Kullanıcıyı sakla
        console.log(userData)
        window.location.href = '/anaekran';
    
      } else {
        setError('Kullanıcı adı veya şifre hatalı.');
      }
    } catch (error) {
      setError('Sunucuya bağlanırken hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };



 const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };


  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

 
  const onInputKeyPress = (button) => {
    if (button === "{enter}") {
      closeKeyboard();
    }
  };

  const onPasswordKeyPress = (button) => {
    if (button === "{enter}") {
      closeKeyboard2();
    }
  };

  const onChangeInput = (event) => {
    setInput(event.target.value);
    if (inputKeyboard.current) {
      inputKeyboard.current.setInput(event.target.value);
    }
  };

  const onChangePassword = (input) => {
    setPassword(input);
    if (passwordKeyboard.current) {
      passwordKeyboard.current.setInput(input);
    }
  };

  const openKeyboard = () => {
    setIsModalOpen(true); // Modal'ı aç
  };

  const closeKeyboard = () => {
    setIsModalOpen(false); // Modal'ı kapat
  };
  const openKeyboard2 = () => {
    setIsModalOpen2(true);   //Şifre için
  };

  const closeKeyboard2 = () => {
    setIsModalOpen2(false);
  };


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onChange = (input) => {
    setInput(input);
  };
  
   
  const getKeyboardLayout = () => {
    return language === "tr" ? turkishLayout : englishLayout;
  };

  return (
  <Box height="113vh" width="100vw"  >
   
    <Grid container spacing={12} justifyContent='center' alignItems='center'  >
       <Grid item xs={12} sm={4} container justifyContent="flex-end" alignItems='center'> 
          <Typography variant='body2'>Sürüm: {version}</Typography> 
        </Grid>

     <Grid item xs={8} container justifyContent="center" alignItems='center' display='flex' flexDirection='column'  >
    <Typography variant='h5'  marginTop={20}>Hoşgeldiniz!</Typography>
    
    <Typography marginTop={5}>Lütfen kullanıcı kodu ve şifrenizi giriniz.</Typography>
     <form noValidate autoComplete="off">
      <FormControl
        sx={{ width: '100%', border: '2px solid black', borderRadius: '8px', marginBottom: '10px' }}
      >
        <OutlinedInput
          value={input}
          placeholder="Kullanıcı Kodu"
          startAdornment={
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={openKeyboard}>
                <KeyboardIcon />
              </IconButton>
            </InputAdornment>
          }
          sx={{
            '&:hover': {
              borderColor: 'black',
            },
            '&:focus': {
              borderColor: 'black',
            },
          }}
          onChange={onChangeInput}
        />
      </FormControl>
      <Dialog open={isModalOpen} onClose={closeKeyboard}>
      <DialogTitle>
      Kullanıcı kodunuzu giriniz
      <FormControl style={{ float: 'right', marginRight: '16px', marginTop: '-8px' }}>
        <InputLabel id="language-select-label">Dil Seçin</InputLabel>
        <Select
          labelId="language-select-label"
          value={language}
          onChange={handleLanguageChange}
        >
          <MenuItem value="tr">Türkçe</MenuItem>
          <MenuItem value="en">İngilizce</MenuItem>
        </Select>
      </FormControl>
    </DialogTitle>
      
        <DialogContent>
          <FormControl sx={{ width: '100%', border: '2px solid black', borderRadius: '8px', marginBottom: '10px' }}>
            <OutlinedInput
              value={input}
              placeholder="Kullanıcı Kodu"
              startAdornment={
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              }
              
              sx={{
                '&:hover': {
                  borderColor: 'black',
                },
                '&:focus': {
                  borderColor: 'black',
                },
              }}
              onChange={onChangeInput}
            />
          
          </FormControl>
          <Keyboard
         keyboardRef={r => (inputKeyboard.current = r)}
         layoutName={layoutName}
         onChange={(input) => setInput(input)}
         onKeyPress={onInputKeyPress}
         {...getKeyboardLayout()}
          />
        </DialogContent>
      </Dialog>
    </form>


    
<form noValidate autoComplete="off" >
    <FormControl 
    sx={{ width:'100%' ,border:  '2px solid black', borderRadius: '8px', marginBottom:'20px'}}
   
>
        <OutlinedInput
        value={password}
        placeholder="Şifre"
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        startAdornment={ 
          <InputAdornment position="start">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="start"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={openKeyboard2}>
              <KeyboardIcon />
            </IconButton>
          </InputAdornment>
        }
        onChange={(e) => setPassword(e.target.value)} 
      />
    </FormControl>
    <Dialog open={isModalOpen2} onClose={closeKeyboard2}>
        <DialogTitle>Şifrenizi giriniz
        <FormControl style={{ float: 'right', marginRight: '16px', marginTop: '-8px' }}>
        <InputLabel id="language-select-label">Dil Seçin</InputLabel>
        <Select
          labelId="language-select-label"
          value={language}
          onChange={handleLanguageChange}
        >
          <MenuItem value="tr">Türkçe</MenuItem>
          <MenuItem value="en">İngilizce</MenuItem>
        </Select>
      </FormControl>
        </DialogTitle>
        <DialogContent>
          <FormControl     sx={{ width:'100%' ,border:  '2px solid black', borderRadius: '8px', marginBottom:'20px'}}
 >
            <OutlinedInput
              value={password}
              placeholder="Şifre"
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              startAdornment={ 
                <InputAdornment position="start">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="start"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              
              onChange={(e) => setPassword(e.target.value)} 
            />
          </FormControl>
        
          <Keyboard
              keyboardRef={r => (passwordKeyboard.current = r)}
              layoutName={layout}
              onChange={onChangePassword}
              onKeyPress={onPasswordKeyPress}
              {...getKeyboardLayout()}
          />
        </DialogContent>
      </Dialog>
    
</form>

<Button 
        variant="contained"
        sx={{ 
          width: '35vh',
          '&:hover': { background: '#cfd8dc' }, 
          background: '#37474f',
          opacity: isLoading ? 0.7 : 1 // Butonu yükleme sırasında hafifçe sönükleştir
        }}
        onClick={loginekran}
        disabled={isLoading} // Yükleme sırasında butonu devre dışı bırak
      >
        {isLoading ? 'Giriş Yapılıyor...' : 'Giriş'} {/* Yükleme durumunu göster */}
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>} 

  </Grid>

    </Grid> 
    </Box>
  )
}
const rootElement = document.getElementById("root");
ReactDOM.render(<Login />, rootElement);