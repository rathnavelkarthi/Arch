import { Tabs } from 'expo-router';
import { House, DraftingCompass, Sparkles } from 'lucide-react-native';
import { brand } from '@/constants/brand';
import { useLanguage } from '@/providers/language-provider';

export default function DiscoverLayout() {
  const { t } = useLanguage();
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: brand.colors.ink, tabBarInactiveTintColor: brand.colors.muted,
    tabBarStyle: { backgroundColor: brand.colors.paper, borderTopColor: brand.colors.line }, tabBarItemStyle: { minHeight: 48 }, tabBarLabelStyle: { fontSize: 12 } }}>
    <Tabs.Screen name="properties" options={{ title: t('Properties'), tabBarIcon: ({ color }) => <House color={color} size={23} /> }} />
    <Tabs.Screen name="architects" options={{ title: t('Architects'), tabBarIcon: ({ color }) => <DraftingCompass color={color} size={23} /> }} />
    <Tabs.Screen name="astrology" options={{ title: t('Astrology / Vastu'), tabBarIcon: ({ color }) => <Sparkles color={color} size={23} /> }} />
  </Tabs>;
}
