import React, { useState, useEffect } from 'react';
import {Box,Grid ,Typography,FormControl,OutlinedInput,InputAdornment,Button,InputLabel} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import  { useRef } from "react"; // useRef'yi içe aktarır
import ReactDOM from "react-dom"; // ReactDOM'u içe aktarır
// Import your MSW worker
import { worker } from '../mocks/browser';
import '../App.css'; 
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Keyboard from "react-simple-keyboard";
import { Dialog,Select, MenuItem,DialogTitle, DialogContent } from '@mui/material';
import 'react-simple-keyboard/build/css/index.css';


export const Login = ({ onSuccessfulLogin }) => {
 
  const [version, setVersion] = useState('');
  const [login, setLogin] = useState('');
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false); // Klavyenin görünürlüğünü tutan durum değişkeni
  const keyboard = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false); //Kullanıcı kodu 
  const [isModalOpen2, setIsModalOpen2] = useState(false); // Şifre için modal
  const [password, setPassword] = useState('');
  const [layoutName, setLayoutName] = useState('default'); // Varsayılan düzen
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState('tr'); // Varsayılan dil Türkçe
 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Start the worker *before* fetching:
    worker.start().then(() => { 
      fetch('/version')
        .then(response => response.json())
        .then(data => setVersion(data.version));
    });

    // Optional: Stop worker when component unmounts
    return () => worker.stop(); 
  }, []); 

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch('/api/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ kullaniciKodu, sifre }),
  //     });

  //     if (response.ok) {
  //       onSuccessfulLogin(); // Anasayfaya yönlendirme
  //     } else {
  //       const data = await response.json();
  //       setHataMesaji(data.message);
  //     }
  //   } catch (error) {
  //     setHataMesaji('Bir hata oluştu.');
  //   }
  // };

  // return (
  //   <form onSubmit={handleSubmit}>
  //     {/* ... input alanları ... */}
  //     <button type="submit">Giriş Yap</button>
  //     {hataMesaji && <p>{hataMesaji}</p>}
  //   </form>
  // );


  // const handleClick = async () => { 
  //   const navigate = useNavigate(); // React Router'ın navigate hook'unu kullanıyoruz
  //   try {
  //     await worker.start();
  //     const response = await fetch('/login', {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ usernumber: 123, password: 'testpassword' }),
  //     });
  
  //     if (!response.ok) { 
  //       throw new Error('Login failed');
  //     }
  
  //     const data = await response.json();
  //     setLogin(data);  
  
  //     // Giriş başarılıysa yönlendirme
  //     navigate('/AnaEkran'); // veya gitmek istediğiniz sayfa yolu
  //   } catch (error) { 
  //     console.error('Error logging in:', error);
  //     // Hata durumunda yönlendirme veya hata mesajı gösterme gibi işlemler yapabilirsiniz
  //   }
  // };

  const loginekran = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kullaniciKodu: input, // input değişkenini doğrudan kullan
          sifre: password
        }),
      });

      if (response.ok) {
        // Başarılı giriş, yönlendirme
        onSuccessfulLogin(); 
      } else {
        const data = await response.json(); 
        setError(data.message || 'Giriş başarısız.'); 
      }
    } catch (error) {
      setError('Sunucuya bağlanırken hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };



// const loginekran = async ()=>{
// const response =await fetch ("/login",{
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({kullaniciKodu: input, sifre: password}),
// });
// console.log(response)
// };





 const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };


  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = button => {
    console.log("Button pressed", button);

    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = event => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
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

  const onChange = (inputFromKeyboard) => {
    if (isModalOpen) { // Eğer kullanıcı kodu modal'ı açıksa
      setInput(inputFromKeyboard);
    } else if (isModalOpen2) { // Eğer şifre modal'ı açıksa
      setPassword(inputFromKeyboard);
    }
    console.log("Input changed", inputFromKeyboard);
  };
  
  const handleLayoutChange = (event) => {
    setLayoutName(event.target.value);
  };


  return (
  <Box bgcolor='#B0BEC5'height="113vh" width="100vw"  >
   
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
        onClick={openKeyboard} // Form elemanına tıklanınca klavyeyi aç
      >
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
      <Dialog open={isModalOpen} onClose={closeKeyboard}>
        <DialogTitle>Kullanıcı kodunuzu giriniz</DialogTitle>
        <DialogContent>
          <FormControl         sx={{ width: '100%', border: '2px solid black', borderRadius: '8px', marginBottom: '10px' }}>
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
          <FormControl>
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
      <Keyboard
  keyboardRef={r => (keyboard.current = r)}
  layoutName={layout ? layoutName : "default"} // Varsayılan düzen kullan
  onChange={onChange}
  onKeyPress={onKeyPress}
/>
        </DialogContent>
      </Dialog>
    </form>
    {isKeyboardVisible && ( // Klavye görünürse
      <Keyboard
        keyboardRef={r => (keyboard.current = r)}
        layoutName={layout}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    )}

<form noValidate autoComplete="off" >
    <FormControl 
    sx={{ width:'100%' ,border:  '2px solid black', borderRadius: '8px', marginBottom:'20px'}}
   
   onClick={openKeyboard2}>
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
    <Dialog open={isModalOpen2} onClose={closeKeyboard2}>
        <DialogTitle>Şifrenizi giriniz</DialogTitle>
        <DialogContent>
          <FormControl     sx={{ width:'100%' ,border:  '2px solid black', borderRadius: '8px', marginBottom:'20px'}}
 onClick={openKeyboard2}>
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
            keyboardRef={r => (keyboard.current = r)}
            layoutName={layout}
            onChange={onChange}
            onKeyPress={onKeyPress}
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