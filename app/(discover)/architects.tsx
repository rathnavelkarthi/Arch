import { useState } from 'react';
import { Text, View } from 'react-native';
import { DraftingCompass } from 'lucide-react-native';
import { Page, Field, ui } from '@/components/brand-ui';
import { DiscoverHeader } from '@/components/discover-header';
import { CatalogState } from '@/components/catalog-state';
import { listArchitects } from '@/lib/catalog';
import { useCatalog } from '@/hooks/use-catalog';
import { useLanguage } from '@/providers/language-provider';
import { brand } from '@/constants/brand';

export default function ArchitectsScreen() {
  const { t } = useLanguage();
  const catalog = useCatalog(listArchitects);
  const [query, setQuery] = useState('');
  const matching = catalog.items.filter(item => `${item.display_name} ${item.city} ${item.state} ${item.specialties.join(' ')} ${item.languages.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <Page><DiscoverHeader />
    <Text style={ui.eyebrow}>{t('DESIGNED AROUND YOU')}</Text>
    <Text style={ui.title}>{t('Good homes begin\nwith good conversations.')}</Text>
    <Text style={ui.body}>{t('Discover architects by location, specialty, and the languages you speak.')}</Text>
    <Field label={t('Search architects')} value={query} onChangeText={setQuery} />
    <CatalogState loading={catalog.loading} error={catalog.error} retry={catalog.retry}
      empty={matching.length ? null : query ? 'No architects match your search.' : 'No published architect profiles yet. Check back soon.'} />
    {!catalog.loading && !catalog.error && matching.map(item => <View style={ui.card} key={item.id}>
      <DraftingCompass size={32} color={brand.colors.ink} />
      <Text style={ui.heading}>{item.display_name}</Text><Text style={ui.body}>{item.city}, {item.state}</Text>
      <Text style={ui.body}>{item.bio}</Text>
      <Text style={ui.notice}>{item.specialties.join(' · ')}</Text><Text style={ui.notice}>{item.languages.join(' · ')}</Text>
    </View>)}
  </Page>;
}
