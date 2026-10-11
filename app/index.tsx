import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BrandedLoader } from '@/components/branded-loader';
import { onboardingStorageKey } from '@/constants/onboarding';
import { useAuth } from '@/providers/auth-provider';

export default function Index() {
  const { session, loading } = useAuth();
  const [completed, setCompleted] = useState<boolean | null>(null);
  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(onboardingStorageKey).then(value => { if (active) setCompleted(value === 'complete'); })
      .catch(() => { if (active) setCompleted(false); });
    return () => { active = false; };
  }, []);
  if (loading || completed === null) return <BrandedLoader />;
  if (session) return <Redirect href="/(app)/(tabs)/dashboard" />;
  return <Redirect href={completed ? '/welcome' : '/onboarding'} />;
}
