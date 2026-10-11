import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';
import { AppState, Platform } from 'react-native';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

const AuthContext = createContext<{ session: Session | null; loading: boolean; error: string | null }>({
  session: null, loading: true, error: null,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const client = supabase;
    if (!client) { setLoading(false); return; }
    let active = true;
    let receivedAuthEvent = false;
    const { data: listener } = client.auth.onAuthStateChange((_event, next) => {
      receivedAuthEvent = true;
      if (active) { setSession(next); setLoading(false); setError(null); }
    });
    client.auth.getSession().then(({ data, error: readError }) => {
      if (!active || receivedAuthEvent) return;
      setSession(data.session);
      if (readError) setError('Your saved session could not be restored. Please sign in again.');
      setLoading(false);
    }).catch(() => {
      if (active && !receivedAuthEvent) {
        setError('Your saved session could not be restored. Please sign in again.');
        setLoading(false);
      }
    });
    const updateRefresh = (state: string) => {
      if (state === 'active') client.auth.startAutoRefresh();
      else client.auth.stopAutoRefresh();
    };
    const subscription = Platform.OS !== 'web' ? AppState.addEventListener('change', updateRefresh) : null;
    if (Platform.OS !== 'web') updateRefresh(AppState.currentState);
    return () => { active = false; listener.subscription.unsubscribe(); subscription?.remove(); if (Platform.OS !== 'web') client.auth.stopAutoRefresh(); };
  }, []);

  return <AuthContext.Provider value={{ session, loading, error }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
