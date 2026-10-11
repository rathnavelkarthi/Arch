import { useState } from 'react';
import { Text, View } from 'react-native';
import { CircleUserRound } from 'lucide-react-native';
import { Action, Notice, Page, ui } from '@/components/brand-ui';
import { brand } from '@/constants/brand';
import { useAuth } from '@/providers/auth-provider';
import { requireSupabase } from '@/lib/supabase';
import { useLanguage } from '@/providers/language-provider';
import { LanguageSelector } from '@/components/language-selector';
import { Link, router } from 'expo-router';

export default function ProfileScreen() {
  const { t } = useLanguage();
  const { session } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const metadataName = session?.user.user_metadata?.full_name;
  const name = typeof metadataName === 'string' ? metadataName : t('Your account');
  async function signOut() {
    if (busy) return;
    setBusy(true); setError(null);
    try {
      const { error: resultError } = await requireSupabase().auth.signOut({ scope: 'local' });
      if (resultError) throw resultError;
    } catch { setError('Could not sign out. Check your connection and try again.'); }
    finally { setBusy(false); }
  }
  return <Page>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Link href="/(discover)/properties" style={ui.link}>{t('Explore Properties')}</Link>
      <Link href="/(app)/(tabs)/dashboard" style={ui.link}>{t('Studio Hub')}</Link>
    </View>
    <Text style={ui.eyebrow}>ILAM MORA / {t('ACCOUNT')}</Text>
    <LanguageSelector />
    <Text style={ui.title}>{t('Your corner\nof home.')}</Text>
    {session ? (
      <>
        <View style={ui.card}>
          <CircleUserRound size={54} color={brand.colors.ink} strokeWidth={1.2} />
          <Text style={ui.heading}>{name}</Text>
          <Text style={ui.body}>{session.user.email}</Text>
          <Notice>{t(session.user.email_confirmed_at ? 'Email verified' : 'Email verification pending')}</Notice>
        </View>
        <View style={ui.card}>
          <Text style={ui.heading}>{t('Account security')}</Text>
          <Notice>{t('WhatsApp verification is being prepared. A verified number will be required before WhatsApp password recovery can be used.')}</Notice>
          {error && <Notice error>{t(error)}</Notice>}
          <Action label={t('Sign out of this device')} onPress={signOut} busy={busy} secondary />
        </View>
      </>
    ) : (
      <View style={ui.card}>
        <CircleUserRound size={54} color={brand.colors.ink} strokeWidth={1.2} />
        <Text style={ui.heading}>{t('Guest Explorer')}</Text>
        <Text style={ui.body}>{t('You are exploring Ilam Mora with full access to client discovery and architect tools.')}</Text>
        <Action label={t('Sign In / Create Account')} onPress={() => router.push('/(auth)/login')} />
      </View>
    )}
  </Page>;
}
