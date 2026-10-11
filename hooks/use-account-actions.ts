import { useState } from 'react';
import { router } from 'expo-router';
import { requireSupabase } from '@/lib/supabase';
import { authErrorMessage, authRedirectUrl, signInWithGoogle } from '@/lib/auth';
import { validateCredentials } from '@/lib/auth-validation';

export function useAccountActions() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  async function submit(email: string, password: string, name?: string) {
    if (busy) return;
    setError(null); setMessage(null);
    const validation = validateCredentials(email.trim(), password, name);
    if (validation) { setError(validation); return; }
    setBusy(true);
    try {
      const client = requireSupabase();
      const result = name === undefined
        ? await client.auth.signInWithPassword({ email: email.trim(), password })
        : await client.auth.signUp({ email: email.trim(), password, options: { data: { full_name: name.trim() }, emailRedirectTo: authRedirectUrl() } });
      if (result.error) throw result.error;
      if (result.data.session) router.replace('/(app)/(tabs)/dashboard');
      else setMessage('Check your email for a verification link, then sign in.');
    } catch (err) { setError(authErrorMessage(err)); }
    finally { setBusy(false); }
  }
  async function google() {
    if (busy) return;
    setBusy(true); setError(null);
    try { await signInWithGoogle(); }
    catch (err) { setError(authErrorMessage(err)); }
    finally { setBusy(false); }
  }
  return { submit, google, busy, error, message };
}
