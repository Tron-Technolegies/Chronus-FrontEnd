import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const DirectionManager = ({ children }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLang = i18n.language || window.localStorage.i18nextLng || 'en';
    const dir = currentLang.startsWith('ar') ? 'rtl' : 'ltr';
    
    document.documentElement.dir = dir;
    document.documentElement.lang = currentLang;
  }, [i18n.language]);

  return <>{children}</>;
};

export default DirectionManager;
