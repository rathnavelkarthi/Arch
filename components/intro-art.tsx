import { Image, StyleSheet, Text, View } from 'react-native';
import { ArrowUpRight, Check, Compass, Heart, House, Share2 } from 'lucide-react-native';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';
import { brand } from '@/constants/brand';
import { useLanguage } from '@/providers/language-provider';

const photo = require('@/assets/branding/illamora-courtyard.png');
export function IntroArt({ kind, height = 290 }: { kind: string; height?: number }) {
  const { t } = useLanguage();
  if (kind === 'home') return <View style={[styles.frame, { height }]}><Image source={photo} style={[StyleSheet.absoluteFillObject, { width: '100%', height: '100%' }]} resizeMode="cover" accessibilityLabel={t('Courtyard home illustration')} /><View style={styles.photoLabel}><Text style={styles.lightText}>{t('A place to belong')}</Text><ArrowUpRight color="#FFF" size={24} /></View></View>;
  if (kind === 'architects') return <View style={[styles.frame, styles.blueprint, { height }]}>
    <Svg width="100%" height="100%" viewBox="0 0 380 290" accessibilityLabel={t('Architectural floor plan illustration')}>
      {Array.from({ length: 12 }, (_, i) => <Line key={`v${i}`} x1={i * 36} y1="0" x2={i * 36} y2="290" stroke="#D2D7C9" strokeWidth="0.6" />)}
      {Array.from({ length: 9 }, (_, i) => <Line key={`h${i}`} x1="0" y1={i * 36} x2="380" y2={i * 36} stroke="#D2D7C9" strokeWidth="0.6" />)}
      <Rect x="65" y="38" width="248" height="204" fill="#F8F5ED" stroke="#173D34" strokeWidth="4" />
      <Path d="M65 115H164V38 M164 115V165H313 M214 165V242 M65 183H130 M130 183V242" fill="none" stroke="#173D34" strokeWidth="4" />
      <Rect x="187" y="63" width="92" height="69" rx="3" fill="#DCE4D8" stroke="#82977F" />
      <Circle cx="231" cy="97" r="20" fill="#9DAC92" />
      <Rect x="84" y="55" width="57" height="36" rx="3" fill="#DACCB7" />
      <Rect x="239" y="189" width="48" height="31" rx="3" fill="#DACCB7" />
      <Path d="M40 38V242 M35 38H45 M35 242H45 M65 263H313 M65 258V268 M313 258V268" stroke="#A87B35" strokeWidth="1.5" />
    </Svg>
    <View style={styles.smallNote}><Text style={styles.noteText}>{t('From an idea to a place')}</Text></View>
  </View>;
  if (kind === 'vastu') return <View style={[styles.frame, { height, backgroundColor: '#E6E8DC', alignItems: 'center', justifyContent: 'center' }]}>
    <View style={styles.outerRing}><View style={styles.innerRing}><Compass size={106} color={brand.colors.ink} strokeWidth={0.75} /></View></View>
    <Text style={[styles.direction, { top: 16 }]}>N</Text><Text style={[styles.direction, { bottom: 16 }]}>S</Text>
    <View style={styles.smallNote}><Text style={styles.noteText}>{t('Space for your traditions')}</Text></View>
  </View>;
  return <View style={[styles.frame, { height, backgroundColor: kind === 'listing' ? '#E5D9C7' : '#DFE8E2', justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
    <View style={[styles.propertyCard, { transform: [{ rotate: kind === 'listing' ? '-5deg' : '4deg' }] }]}>
      <Image source={photo} style={{ width: '100%', height: height * 0.47, borderRadius: 13 }} resizeMode="cover" />
      <View style={{ padding: 12, gap: 8 }}><View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><House size={20} color={brand.colors.ink} /><Heart size={19} color={brand.colors.ink} /></View><View style={styles.line} /><View style={[styles.line, { width: '58%', backgroundColor: '#E6E9E1' }]} /></View>
    </View>
    <View style={[styles.floatingIcon, { right: kind === 'listing' ? '12%' : '16%', bottom: 30 }]}>{kind === 'listing' ? <Check size={25} color="#FFF" /> : <Share2 size={24} color="#FFF" />}</View>
  </View>;
}

const styles = StyleSheet.create({
  frame: { width: '100%', borderRadius: 28, overflow: 'hidden' },
  photoLabel: { position: 'absolute', left: 18, bottom: 18, right: 18, padding: 16, borderRadius: 14, backgroundColor: '#173D34E8', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  lightText: { fontFamily: 'Outfit_500Medium', color: '#FFF', fontSize: 17 },
  blueprint: { backgroundColor: '#E8EBDF' },
  smallNote: { position: 'absolute', bottom: 16, paddingHorizontal: 18, paddingVertical: 9, backgroundColor: brand.colors.paper, borderRadius: 20, alignSelf: 'center' },
  noteText: { color: brand.colors.ink, fontSize: 13, fontFamily: 'Outfit_500Medium' },
  outerRing: { width: 224, height: 224, borderRadius: 112, borderWidth: 1, borderColor: '#AFB9A4', justifyContent: 'center', alignItems: 'center' },
  innerRing: { width: 176, height: 176, borderRadius: 88, borderWidth: 1, borderColor: '#AFB9A4', backgroundColor: '#F8F5ED', justifyContent: 'center', alignItems: 'center' },
  direction: { position: 'absolute', color: brand.colors.muted, fontSize: 11, fontFamily: 'Outfit_500Medium' },
  propertyCard: { width: '72%', maxWidth: 250, backgroundColor: '#FFF', padding: 8, borderRadius: 20, boxShadow: '0 12px 30px rgba(23,61,52,0.12)' },
  line: { height: 6, width: '85%', borderRadius: 3, backgroundColor: '#BECBBB' },
  floatingIcon: { position: 'absolute', width: 55, height: 55, borderRadius: 20, backgroundColor: brand.colors.ink, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: '#F8F5ED' },
});
