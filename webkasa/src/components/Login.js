import { Box, Grid, Typography, FormControl, OutlinedInput, InputAdornment, Button, InputLabel, IconButton, Dialog, Select, MenuItem, DialogTitle, DialogContent } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import React, { useState, useRef, useEffect, useContext } from 'react';
import 'react-simple-keyboard/build/css/index.css';
import Keyboard from "react-simple-keyboard";
import turkishLayout from "simple-keyboard-layouts/build/layouts/turkish";
import englishLayout from "simple-keyboard-layouts/build/layouts/english";
import TemaContext, { lightTheme, darkTheme } from '../context/Tema';
import { ThemeProvider as MuiThemeProvider, useTheme } from '@mui/material/styles';

export const Login = () => {
  const [version, setVersion] = useState('');
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const inputKeyboard = useRef(null);
  const passwordKeyboard = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [password, setPassword] = useState('');
  const [layoutName, setLayoutName] = useState('default');
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState('tr');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { theme } = useContext(TemaContext);
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;



  useEffect(() => {
    fetch('/version')
      .then(response => response.json())
      .then(data => setVersion(data.version));
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
      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('user', userData);
        console.log(userData);
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
    setIsModalOpen(true);
  };

  const closeKeyboard = () => {
    setIsModalOpen(false);
  };

  const openKeyboard2 = () => {
    setIsModalOpen2(true);
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

  const getKeyboardLayout = () => {
    return language === "tr" ? turkishLayout : englishLayout;
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      loginekran();
    }
  };

  return (
    <MuiThemeProvider theme={currentTheme}>
      <Box
        sx={{
          bgcolor: 'background.default',
          color: theme === 'dark' ? 'white' : 'black',
          height: '100vh',
          width: '100vw',
          padding: 0,
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Grid container sx={{ height: '100%', width: '100%', minHeight: '100vh', minWidth: '100vw' }}>
          <Grid item xs={12} sm={6} container direction="column" justifyContent="center" alignItems="center" sx={{ padding: 2 }}>
            <Typography variant='h5' marginTop={4} color={theme === 'dark' ? 'white' : 'black'}>Hoşgeldiniz!</Typography>
            <Typography marginTop={2} marginBottom={2} color={theme === 'dark' ? 'white' : 'black'}>Lütfen kullanıcı kodu ve şifrenizi giriniz.</Typography>

            <form noValidate autoComplete="off" style={{ width: '100%' }}>
              <FormControl sx={{ width: '100%', marginBottom: 2 }}>
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
                  onChange={onChangeInput}
                  onKeyDown={handleKeyDown}
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
                  <FormControl sx={{ width: '100%', marginBottom: 2 }}>
                    <OutlinedInput
                      value={input}
                      placeholder="Kullanıcı Kodu"
                      startAdornment={
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      }
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

            <form noValidate autoComplete="off" style={{ width: '100%' }}>
              <FormControl sx={{ width: '100%', marginBottom: 2 }}>
                <OutlinedInput
                  value={password}
                  placeholder="Şifre"
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
                  onKeyDown={handleKeyDown}
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
                  <FormControl sx={{ width: '100%', marginBottom: 2 }}>
                    <OutlinedInput
                      value={password}
                      placeholder="Şifre"
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
              <Button
                variant="contained"
                sx={{
                  width: '100%',
                  marginTop: 2,
                  '&:hover': {
                    background: theme === 'dark' ? '#333' : '#cfd8dc'
                  },
                  background: theme === 'dark' ? '#555' : '#37474f',
                  opacity: isLoading ? 0.7 : 1
                }}
                onClick={loginekran}
                disabled={isLoading}
              >
                {isLoading ? 'Giriş Yapılıyor...' : 'Giriş'}
              </Button>
              {error && <Typography variant="body2" color={theme === 'dark' ? 'error.dark' : 'error.light'} sx={{ marginTop: 2 }}>{error}</Typography>}
            </form>
          </Grid>
          <Grid item xs={12} sm={6} container direction="column" justifyContent="center" alignItems="center" sx={{ padding: 2 }}>
            <Typography variant='body2' color={theme === 'dark' ? 'white' : 'black'}>Sürüm: {version}</Typography>
          </Grid>
        </Grid>
      </Box>
    </MuiThemeProvider>
  );
};


