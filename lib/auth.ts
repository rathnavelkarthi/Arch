import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import { requireSupabase } from './supabase';

WebBrowser.maybeCompleteAuthSession();

export function authRedirectUrl() {
  return Linking.createURL('auth/callback');
}

// The browser result and the deep-link route can receive the same code.
// Share the in-flight exchange so a single-use code is never redeemed twice.
const exchanges = new Map<string, Promise<void>>();
export function exchangeAuthCode(code: string) {
  const existing = exchanges.get(code);
  if (existing) return existing;
  const pending = (async () => {
    const { error } = await requireSupabase().auth.exchangeCodeForSession(code);
    if (error) throw new Error('This sign-in link has expired or belongs to another device. Please sign in again.');
  })();
  exchanges.set(code, pending);
  // Bound the cache without logging authorization codes.
  if (exchanges.size > 8) exchanges.delete(exchanges.keys().next().value!);
  return pending;
}

export async function signInWithGoogle() {
  const redirectTo = authRedirectUrl();
  const { data, error } = await requireSupabase().auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo, skipBrowserRedirect: true },
  });
  if (error || !data.url) throw new Error('Google sign-in could not start. Please try again.');
  if (Platform.OS === 'web') {
    window.location.assign(data.url);
    return;
  }
  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  if (result.type !== 'success') return;
  const callback = new URL(result.url);
  const expected = new URL(redirectTo);
  if (callback.protocol !== expected.protocol || callback.host !== expected.host || callback.pathname !== expected.pathname) {
    throw new Error('The sign-in callback could not be verified. Please try again.');
  }
  const code = callback.searchParams.get('code');
  if (!code || callback.searchParams.has('error')) throw new Error('Google sign-in was not completed. Please try again.');
  await exchangeAuthCode(code);
}

export function authErrorMessage(error: unknown) {
  const code = error && typeof error === 'object' && 'code' in error ? error.code : undefined;
  if (code === 'invalid_credentials') return 'The email or password is incorrect.';
  if (code === 'email_not_confirmed') return 'Verify your email before signing in. Check your inbox and spam folder.';
  if (code === 'over_request_rate_limit' || code === 'over_email_send_rate_limit') return 'Too many attempts. Please wait before trying again.';
  if (code === 'weak_password') return 'Choose a stronger password with at least 12 characters.';
  if (error instanceof TypeError) return 'Could not reach account services. Check your connection and try again.';
  // Only expose controlled local errors, not arbitrary server responses.
  if (error instanceof Error && !('status' in error)) return error.message;
  return 'We could not complete that request. Please try again.';
}
