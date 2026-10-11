import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Building2, CircleUserRound, Languages, ArrowLeft } from 'lucide-react-native';
import { brand } from '@/constants/brand';
import { useAuth } from '@/providers/auth-provider';
import { useLanguage } from '@/providers/language-provider';
import { LanguageSelector } from './language-selector';
import { ui } from './brand-ui';

export function DiscoverHeader() {
  const [languagesOpen, setLanguagesOpen] = useState(false);
  const { session } = useAuth();
  const { t } = useLanguage();
  return <View style={{ gap: 18 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <Building2 size={28} color={brand.colors.ink} strokeWidth={1.5} />
        <Text style={ui.heading}>Ilam Mora</Text>
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel={t(session ? 'Your account' : 'Sign in')}
        onPress={() => router.push(session ? '/(app)/(tabs)/profile' : '/(auth)/login')}
        style={{ minHeight: 48, minWidth: 48, alignItems: 'center', justifyContent: 'center' }}>
        <CircleUserRound size={26} color={brand.colors.ink} />
      </Pressable>
    </View>
    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
      <Pressable accessibilityRole="button" onPress={() => router.replace('/(app)/(tabs)/dashboard')} style={{minHeight:48, flexDirection:'row', gap:8, alignItems:'center'}}><ArrowLeft size={18} color={brand.colors.accent}/><Text style={ui.link}>Home</Text></Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="Choose language" accessibilityState={{expanded:languagesOpen}} onPress={() => setLanguagesOpen(!languagesOpen)} style={{minHeight:48, flexDirection:'row', gap:8, alignItems:'center'}}><Languages size={18} color={brand.colors.accent}/><Text style={ui.link}>Language</Text></Pressable>
    </View>
    {languagesOpen && <LanguageSelector />}
  </View>;
}
