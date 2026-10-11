import { useState } from 'react';
import { Linking, Pressable, Text, View } from 'react-native';
import { Check, Compass, Sparkles } from 'lucide-react-native';
import { Page, Notice, ui } from '@/components/brand-ui';
import { DiscoverHeader } from '@/components/discover-header';
import { brand } from '@/constants/brand';
import { useLanguage } from '@/providers/language-provider';

const preparations = [
  { id: 'orientation', title: 'Confirm the orientation', detail: 'Bring a site plan with north marked and the entrance direction measured. A phone compass alone may be inaccurate indoors.' },
  { id: 'layout', title: 'Bring the floor plan', detail: 'Mark entrances, kitchen, bedrooms, prayer space, stairs and water points. Note what can realistically be changed.' },
  { id: 'priorities', title: 'Share your family’s priorities', detail: 'Write down the traditions you follow and the needs of everyone who will live there. Preferences differ between families and regions.' },
  { id: 'practical', title: 'Review practical needs', detail: 'Discuss daylight, ventilation, accessibility, structural safety and local building rules with your architect.' },
];

export default function AstrologyScreen() {
  const { t } = useLanguage();
  const [section, setSection] = useState<'planning' | 'dates'>('planning');
  const [checked, setChecked] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  async function openReference() {
    try { await Linking.openURL('https://ignca.gov.in/divisionss/academic-unit/short-term-certification-course/vastu-shastra/'); }
    catch { setError('Could not open the reference. Please try again.'); }
  }
  return <Page><DiscoverHeader />
    <View style={[ui.card, { backgroundColor: '#eef2ff' }]}>
      <Sparkles color={brand.colors.accent} size={32} strokeWidth={1.4} />
      <Text style={ui.title}>{t('Astrology & Vastu')}</Text>
      <Text style={ui.body}>{t('Explore Vastu and property traditions at your own pace.')}</Text>
    </View>
    <View style={[ui.card,{borderColor:'#ddd6fe',gap:10}]}>
      <Text style={[ui.heading,{fontSize:20}]}>AI property guidance</Text>
      <Text style={ui.body}>Ask about your home’s orientation, layout and family traditions.</Text>
      <View style={{alignSelf:'flex-start',backgroundColor:'#ede9fe',paddingHorizontal:12,paddingVertical:8,borderRadius:8}}><Text style={{color:'#6d28d9',fontWeight:'600'}}>Coming soon</Text></View>
      <Notice>AI guidance is not connected yet. You can use the Vastu preparation checklist below today.</Notice>
    </View>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
      {(['planning', 'dates'] as const).map(value => <Pressable key={value} accessibilityRole="button" accessibilityState={{ selected: section === value }}
        onPress={() => setSection(value)} style={[ui.action, section !== value && ui.secondary, { flexGrow: 1 }]}>
        <Text style={[ui.actionText, section !== value && { color: brand.colors.ink }]}>{t(value === 'planning' ? 'Vastu planning' : 'Auspicious dates')}</Text>
      </Pressable>)}
    </View>
    {section === 'planning' ? <>
      <Text style={ui.heading}>{t('Prepare for a consultation')}</Text>
      <Text style={ui.body}>{t('Use this checklist to gather information for your architect or chosen practitioner. It does not rate your property.')}</Text>
      {preparations.map(item => <Pressable key={item.id} accessibilityRole="checkbox" accessibilityLabel={t(item.title)} accessibilityState={{ checked: checked.includes(item.id) }}
        onPress={() => setChecked(current => current.includes(item.id) ? current.filter(value => value !== item.id) : [...current, item.id])}
        style={[ui.card, { flexDirection: 'row', alignItems: 'flex-start', gap: 14 }]}>
        <View style={{ width: 26, height: 26, borderWidth: 1, borderRadius: 8, borderColor: brand.colors.ink, backgroundColor: checked.includes(item.id) ? brand.colors.ink : brand.colors.surface, alignItems: 'center', justifyContent: 'center' }}>
          {checked.includes(item.id) && <Check size={18} color={brand.colors.paper} />}
        </View>
        <View style={{ flex: 1, gap: 8 }}><Text style={ui.label}>{t(item.title)}</Text><Text style={ui.body}>{t(item.detail)}</Text></View>
      </Pressable>)}
      <Notice>{checked.length} / {preparations.length} {t('items ready for your consultation')}</Notice>
    </> : <View style={ui.card}>
      <Compass size={32} color={brand.colors.accent} />
      <Text style={ui.heading}>{t('Plan a meaningful beginning')}</Text>
      <Text style={ui.body}>{t('For a housewarming or foundation ceremony, prepare your property location, local timezone, preferred date range and the tradition your family follows.')}</Text>
      <Notice>{t('Personalized dates are not available yet. A qualified practitioner or verified calendar service must confirm them. No dates are being calculated here.')}</Notice>
    </View>}
    <Notice>{t('These are optional cultural and spiritual practices, not guarantees of health, prosperity or investment returns. Keep building safety and legal checks separate.')}</Notice>
    <Pressable accessibilityRole="link" onPress={openReference} style={{ minHeight: 48, justifyContent: 'center' }}><Text style={ui.link}>{t('Read about Vastu traditions · IGNCA')}</Text></Pressable>
    {error && <Notice error>{t(error)}</Notice>}
  </Page>;
}
