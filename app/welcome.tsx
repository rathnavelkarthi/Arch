import { Text, View } from 'react-native';
import { Link, Redirect, router } from 'expo-router';
import { House } from 'lucide-react-native';
import { Action, Page, ui } from '@/components/brand-ui';
import { IntroArt } from '@/components/intro-art';
import { LanguageSelector } from '@/components/language-selector';
import { useLanguage } from '@/providers/language-provider';
import { useAuth } from '@/providers/auth-provider';
import { brand } from '@/constants/brand';

export default function Welcome() {
  const { t } = useLanguage();
  const { session } = useAuth();
  if (session) return <Redirect href="/(app)/(tabs)/dashboard" />;
  return <Page>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9 }}><House color={brand.colors.ink} size={26} /><Text style={[ui.heading, { fontSize: 28 }]}>Ilam Mora</Text></View>
    <IntroArt kind="home" height={260} />
    <Text style={[ui.title, { fontFamily: 'Outfit_500Medium' }]}>{t('Your next chapter\nstarts here.')}</Text>
    <Text style={ui.body}>{t('Find a place. Meet your architect. Make it home.')}</Text>
    <Action label={t('Create account')} onPress={() => router.push('/(auth)/signup-iconic')} />
    <Action label={t('Sign in')} onPress={() => router.push('/(auth)/login')} secondary />
    <Link href="/(app)/(tabs)/dashboard" style={[ui.link, { textAlign: 'center' }]}>{t('Browse without signing in')}</Link>
    <LanguageSelector />
    <Link href="/onboarding" style={[ui.link, { textAlign: 'center' }]}>{t('Take a tour')}</Link>
  </Page>;
}
