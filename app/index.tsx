import { Redirect } from 'expo-router';

export default function Index() {
  // Splash screen behavior. For now, simply redirect to the login screen.
  return <Redirect href="/(auth)/login" />;
}
