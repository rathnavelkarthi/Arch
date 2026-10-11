import { ActivityIndicator, Text, View } from 'react-native';
import { Action, Notice, ui } from './brand-ui';
import { useLanguage } from '@/providers/language-provider';
import { brand } from '@/constants/brand';

export function CatalogState({ loading, error, empty, retry }: { loading: boolean; error: string | null; empty: string | null; retry: () => void }) {
  const { t } = useLanguage();
  if (loading) return <View style={ui.card}><ActivityIndicator color={brand.colors.ink} accessibilityLabel={t('Loading')} /><Text style={ui.body}>{t('Loading')}</Text></View>;
  if (error) return <View style={ui.card}><Notice error>{t(error)}</Notice><Action label={t('Try again')} onPress={retry} secondary /></View>;
  if (empty) return <View style={ui.card}><Text style={ui.body}>{t(empty)}</Text></View>;
  return null;
}
