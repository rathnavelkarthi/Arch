import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { MapPin, Sparkles, ArrowUpRight, DraftingCompass } from 'lucide-react-native';
import { Page, Field, Action, ui } from '@/components/brand-ui';
import { DiscoverHeader } from '@/components/discover-header';
import { CatalogState } from '@/components/catalog-state';
import { useCatalog } from '@/hooks/use-catalog';
import { listProperties, type PropertyKind } from '@/lib/catalog';
import { brand } from '@/constants/brand';
import { useLanguage } from '@/providers/language-provider';

const filters: { value: PropertyKind | 'all'; label: string }[] = [
  { value: 'all', label: 'All' }, { value: 'house', label: 'Houses' }, { value: 'apartment', label: 'Apartments' },
  { value: 'plot', label: 'Plots' }, { value: 'farmhouse', label: 'Farmhouses' },
];

export default function PropertiesScreen() {
  const { t, language } = useLanguage();
  const catalog = useCatalog(listProperties);
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<PropertyKind | 'all'>('all');
  const matching = catalog.items.filter(item => (kind === 'all' || item.kind === kind) && `${item.title} ${item.city} ${item.state}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <Page><DiscoverHeader />
    <View style={{backgroundColor:'#0f172a', borderRadius:24, overflow:'hidden'}}>
      <Image source={require('@/assets/branding/illamora-courtyard.png')} accessibilityLabel="Illustration of a South Indian courtyard home" style={{width:'100%',height:190}} resizeMode="cover"/>
      <View style={{padding:24,gap:14}}>
        <Text accessibilityRole="header" style={[ui.title,{fontSize:32,lineHeight:38,color:'#fff'}]}>Find a home.
Build your next chapter.</Text>
        <Text style={[ui.body,{color:'#cbd5e1'}]}>Discover properties in South India. Bring your architect, your family and your plans together.</Text>
        <Action label="Upload your property" onPress={() => router.push('/property/new')}/>
      </View>
    </View>
    <View style={{gap:0,borderWidth:1,borderColor:'#e2e8f0',borderRadius:16,backgroundColor:'#fff',overflow:'hidden'}}>
      <Pressable accessibilityRole="button" onPress={() => router.push('/(discover)/astrology')} style={({pressed})=>({padding:20,flexDirection:'row',gap:14,alignItems:'center',backgroundColor:pressed?'#eef2ff':'#fff'})}>
        <Sparkles size={26} color="#7c3aed"/><View style={{flex:1,gap:4}}><Text style={[ui.heading,{fontSize:18}]}>Astrology & Vastu</Text><Text style={[ui.body,{fontSize:14,lineHeight:20}]}>Vastu planning available · AI guidance coming soon</Text></View><ArrowUpRight size={20} color="#64748b"/>
      </Pressable>
      <View style={{height:1,backgroundColor:'#e2e8f0',marginHorizontal:20}}/>
      <Pressable accessibilityRole="button" onPress={() => router.push('/(discover)/architects')} style={({pressed})=>({padding:20,flexDirection:'row',gap:14,alignItems:'center',backgroundColor:pressed?'#eef2ff':'#fff'})}>
        <DraftingCompass size={26} color="#2463eb"/><View style={{flex:1,gap:4}}><Text style={[ui.heading,{fontSize:18}]}>Find your architect</Text><Text style={[ui.body,{fontSize:14,lineHeight:20}]}>Explore design partners for your property</Text></View><ArrowUpRight size={20} color="#64748b"/>
      </Pressable>
    </View>
    <Field label={t('Search by city or property')} value={query} onChangeText={setQuery} placeholder={t('Search by city or property')} />
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      {filters.map(item => <Pressable key={item.value} accessibilityRole="button" accessibilityState={{ selected: kind === item.value }} onPress={() => setKind(item.value)}
        style={{ padding: 13, minHeight: 48, borderRadius: 24, backgroundColor: kind === item.value ? brand.colors.ink : brand.colors.surface, borderWidth: 1, borderColor: brand.colors.line }}>
        <Text style={{ color: kind === item.value ? brand.colors.paper : brand.colors.ink }}>{t(item.label)}</Text>
      </Pressable>)}
    </View>
    <Text style={ui.heading}>{t('Explore properties')}</Text>
    <CatalogState loading={catalog.loading} error={catalog.error} retry={catalog.retry}
      empty={matching.length ? null : query || kind !== 'all' ? 'No properties match your search.' : 'No published properties yet. Check back soon.'} />
    {!catalog.loading && !catalog.error && matching.map(item => <View key={item.id} style={ui.card}>
      <Text style={ui.eyebrow}>{t(filters.find(filter => filter.value === item.kind)?.label ?? item.kind)}</Text>
      <Text style={ui.heading}>{item.title}</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}><MapPin size={18} color={brand.colors.muted} /><Text style={ui.body}>{item.city}, {item.state}</Text></View>
      <Text style={ui.heading}>{new Intl.NumberFormat(`${language}-IN`, { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(item.price_inr)}{item.purpose === 'rent' ? ` / ${t('month')}` : ''}</Text>
      <Text style={ui.body}>{item.area_sqft.toLocaleString()} {t('sq ft')}</Text>
      <Text style={ui.body}>{item.description}</Text>
    </View>)}
  </Page>;
}
