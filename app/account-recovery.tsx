import { Link } from 'expo-router';
import { Text } from 'react-native';
import { Page, Notice, ui } from '@/components/brand-ui';
export default function AccountRecovery() {
  return <Page><Text style={ui.title}>Account recovery</Text><Notice>WhatsApp password recovery is being connected. It is not available yet.</Notice><Link href="/(auth)/login" style={ui.link}>Back to sign in</Link></Page>;
}
