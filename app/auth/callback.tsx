import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { BrandedLoader } from '@/components/branded-loader';
import { Link, Redirect, useLocalSearchParams } from 'expo-router';
import { Page, Notice, ui } from '@/components/brand-ui';
import { exchangeAuthCode } from '@/lib/auth';
import { useAuth } from '@/providers/auth-provider';

export default function AuthCallback() {
  const params = useLocalSearchParams<{ code?: string; error?: string }>();
  const { session } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  useEffect(() => {
    let active = true;
    if (params.error || typeof params.code !== 'string' || !params.code) {
      setError('This sign-in link is incomplete. Please start again.');
      return;
    }
    exchangeAuthCode(params.code).then(() => { if (active) setDone(true); }).catch(() => {
      if (active) setError('This link has expired or was opened on another device. Please sign in again.');
    });
    return () => { active = false; };
  }, [params.code, params.error]);
  if (session && done) return <Redirect href="/(app)/(tabs)/dashboard" />;
  return <Page><Text style={ui.title}>Finishing sign-in</Text>{error ? <Notice error>{error}</Notice> : <BrandedLoader label="Finishing sign-in" />}<Link href="/(auth)/login" style={ui.link}>Return to sign in</Link></Page>;
}
