import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useRef, useState, type PropsWithChildren } from 'react';
import { Platform } from 'react-native';
import { isLanguage, translate, type Language } from '@/constants/translations';

const storageKey = 'illamora.language';
const LanguageContext = createContext({ language: 'en' as Language, selectLanguage: (_value: Language) => {}, t: (message: string) => message });

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguage] = useState<Language>('en');
  const chosen = useRef(false);
  const writes = useRef(Promise.resolve());
  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(storageKey).then(value => {
      if (active && !chosen.current && isLanguage(value)) setLanguage(value);
    }).catch(() => { /* English remains usable when storage is unavailable. */ });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') document.documentElement.lang = language;
  }, [language]);
  function selectLanguage(value: Language) {
    chosen.current = true;
    setLanguage(value);
    // Serialize rapid changes so the last selected language survives a restart.
    writes.current = writes.current.then(() => AsyncStorage.setItem(storageKey, value)).catch(() => {});
  }
  return <LanguageContext.Provider value={{ language, selectLanguage, t: message => translate(message, language) }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
