import { Pressable, Text, View } from 'react-native';
import { languages } from '@/constants/translations';
import { brand } from '@/constants/brand';
import { useLanguage } from '@/providers/language-provider';
import { ui } from './brand-ui';

export function LanguageSelector() {
  const { language, selectLanguage, t } = useLanguage();
  return <View style={{ gap: 8 }}>
    <Text style={ui.label}>{t('Language')}</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      {languages.map(item => <Pressable key={item.code} accessibilityRole="radio" accessibilityState={{ checked: item.code === language }}
        accessibilityLabel={item.label} onPress={() => selectLanguage(item.code)}
        style={({ pressed }) => ({ minHeight: 48, paddingHorizontal: 14, paddingVertical: 12, borderRadius: 24, borderWidth: 1, borderColor: brand.colors.line,
          backgroundColor: item.code === language ? brand.colors.ink : brand.colors.surface, opacity: pressed ? 0.8 : 1, justifyContent: 'center' })}>
        <Text style={{ color: item.code === language ? brand.colors.paper : brand.colors.ink, fontSize: 15 }}>{item.label}</Text>
      </Pressable>)}
    </View>
  </View>;
}
