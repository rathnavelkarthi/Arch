import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';
import { Link, Redirect } from 'expo-router';
import { Building2 } from 'lucide-react-native';
import { Action, Field, Notice, Page, ui } from '@/components/brand-ui';
import { brand } from '@/constants/brand';
import { authErrorMessage, authRedirectUrl } from '@/lib/auth';
import { requireSupabase, supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/auth-provider';
import { validateCredentials } from '@/lib/auth-validation';
import { useLanguage } from '@/providers/language-provider';
import { LanguageSelector } from '@/components/language-selector';

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const { t } = useLanguage();
  const { session, loading, error: sessionError } = useAuth();
  const signup = mode === 'signup';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState<'email' | 'google' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  if (!loading && session) return <Redirect href="/(app)/(tabs)/dashboard" />;

  async function submit() {
    if (busy) return;
    setError(null); setMessage(null);
    const normalizedEmail = email.trim();
    const validationError = validateCredentials(normalizedEmail, password, signup ? name : undefined);
    if (validationError) { setError(validationError); return; }
    setBusy('email');
    try {
      const client = requireSupabase();
      if (signup) {
        const { data, error: resultError } = await client.auth.signUp({
          email: normalizedEmail, password,
          options: { data: { full_name: name.trim() }, emailRedirectTo: authRedirectUrl() },
        });
        if (resultError) throw resultError;
        if (!data.session) setMessage('Check your email for a verification link. Open it on this device, then sign in. If you already have an account, return to sign in.');
        setPassword('');
      } else {
        const { error: resultError } = await client.auth.signInWithPassword({ email: normalizedEmail, password });
        if (resultError) throw resultError;
        setPassword('');
      }
    } catch (err) { setError(authErrorMessage(err)); }
    finally { setBusy(null); }
  }



  return <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <Page>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}><Building2 size={24} color={brand.colors.ink} strokeWidth={1.4} /><Text style={ui.heading}>Ilam Mora</Text></View>
        <Link href="/welcome" style={ui.link}>{t('Back')}</Link>
      </View>
      <View style={{ flexDirection: 'row', gap: 18, alignItems: 'center', marginVertical: 10 }}>
        <View style={{ flex: 1, gap: 8 }}>
          <Text style={[ui.title, { fontSize: 30, lineHeight: 36 }]}>{t(signup ? 'Make yourself\nat home.' : 'Welcome\nhome.')}</Text>
          <Text style={ui.body}>{t(signup ? 'A new place. A fresh beginning.' : 'Your next chapter is waiting.')}</Text>
        </View>
        <Image source={require('@/assets/branding/illamora-courtyard.png')} style={{ width: 94, height: 124, borderRadius: 48 }} resizeMode="cover" accessibilityLabel={t('Courtyard home illustration')} />
      </View>
      <View style={ui.card}>
        <Text style={ui.heading}>{t(signup ? 'Create your account' : 'Welcome back')}</Text>
        {!supabase && <Notice>{t('Account services are being set up. Sign-in will be available once setup is complete.')}</Notice>}
        {sessionError && <Notice error>{t(sessionError)}</Notice>}
        {signup && <Field label={t('Your name')} value={name} onChangeText={setName} autoComplete="name" maxLength={100} editable={!busy} />}
        <Field label={t('Email address')} value={email} onChangeText={setEmail} autoCapitalize="none" autoCorrect={false} autoComplete="email" keyboardType="email-address" maxLength={254} editable={!busy} />
        <Field label={t('Password')} value={password} onChangeText={setPassword} secureTextEntry={!visible} autoCapitalize="none" autoCorrect={false} autoComplete={signup ? 'new-password' : 'current-password'} editable={!busy} onSubmitEditing={submit} />
        <Pressable accessibilityRole="button" accessibilityLabel={t(visible ? 'Hide password' : 'Show password')} onPress={() => setVisible(!visible)} style={{ minHeight: 48, justifyContent: 'center' }}>
          <Text style={ui.link}>{t(visible ? 'Hide password' : 'Show password')}</Text>
        </Pressable>
        {error && <Notice error>{t(error)}</Notice>}
        {message && <Notice>{t(message)}</Notice>}
        <Action label={t(signup ? 'Create account' : 'Sign in')} onPress={submit} busy={busy === 'email'} disabled={!!busy || loading || !supabase} />
        <Link href={signup ? '/(auth)/login' : '/(auth)/signup-iconic'} style={ui.link}>{t(signup ? 'Already have an account? Sign in' : 'New to Ilam Mora? Create an account')}</Link>
      </View>
      <Notice>{t('WhatsApp verification and password recovery are not available yet. They will be enabled after the messaging service is connected and tested.')}</Notice>
      <LanguageSelector />
      <Link href="/(app)/(tabs)/dashboard" style={[ui.link, { textAlign: 'center' }]}>{t('Browse without signing in')}</Link>
    </Page>
  </KeyboardAvoidingView>;
}
