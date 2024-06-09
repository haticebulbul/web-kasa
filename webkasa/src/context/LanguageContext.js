import React, { createContext, useState } from 'react';

const LanguageContext = createContext({
  language: 'tr', 
  changeLanguage: () => {},
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('tr');

  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    // i18n.changeLanguage(newLang); // Eğer i18next'i doğrudan kullanıyorsanız
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
