import { Stack } from 'expo-router';
import { BrandedLoader } from '@/components/branded-loader';
import { useAuth } from '@/providers/auth-provider';

export default function AppLayout() {
  const { loading } = useAuth();
  if (loading) return <BrandedLoader label="Restoring your session" />;
  return <Stack screenOptions={{ headerShown: false }} />;
}

