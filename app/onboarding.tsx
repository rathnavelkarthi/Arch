import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { ArrowLeft, ArrowRight, House } from 'lucide-react-native';
import { introPages, onboardingStorageKey } from '@/constants/onboarding';
import { brand } from '@/constants/brand';
import { IntroArt } from '@/components/intro-art';
import { IntroMotion } from '@/components/intro-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useLanguage } from '@/providers/language-provider';

export default function Onboarding() {
  const { height } = useWindowDimensions();
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const scrollRef = useRef<ScrollView>(null);
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState(0);
  const [busy, setBusy] = useState(false);
  const currentPage = useRef(0);
  const artHeight = Math.max(190, Math.min(330, height * 0.38));
  useEffect(() => { scrollRef.current?.scrollTo({ x: currentPage.current * width, animated: false }); }, [width]);
  function goTo(index: number) {
    const next = Math.max(0, Math.min(introPages.length - 1, index));
    currentPage.current = next; setActive(next);
    scrollRef.current?.scrollTo({ x: next * width, animated: !reduced });
    AccessibilityInfo.announceForAccessibility(t(introPages[next].title).replace('\n', ' '));
  }
  async function finish() {
    if (busy) return;
    setBusy(true);
    try { await AsyncStorage.setItem(onboardingStorageKey, 'complete'); }
    catch { /* A storage failure must not trap someone in onboarding. */ }
    router.replace('/welcome');
  }
  return <SafeAreaView style={styles.safe}>
    <View style={styles.shell} onLayout={event => setWidth(event.nativeEvent.layout.width)}>
      <View style={styles.header}><View style={styles.wordmark}><House color={brand.colors.ink} size={22} strokeWidth={1.4} /><Text style={styles.brand}>Ilam Mora</Text></View>
        <Pressable onPress={finish} disabled={busy} accessibilityRole="button" style={styles.skip}><Text style={styles.skipText}>{t('Skip')}</Text></Pressable>
      </View>
      {width > 0 && <ScrollView ref={scrollRef} horizontal pagingEnabled showsHorizontalScrollIndicator={false} scrollEventThrottle={32}
        onScroll={event => { const index = Math.max(0, Math.min(4, Math.round(event.nativeEvent.contentOffset.x / width))); currentPage.current = index; setActive(index); }}
        style={{ flex: 1 }}>
        {introPages.map((page, index) => <View key={page.id} style={{ width, height: '100%' }} aria-hidden={active !== index} accessibilityElementsHidden={active !== index} importantForAccessibility={active === index ? 'auto' : 'no-hide-descendants'}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.page}>
            <IntroMotion active={active === index} kind="art" scrollRef={scrollRef}><IntroArt kind={page.id} height={artHeight} /></IntroMotion>
            <IntroMotion active={active === index} kind="text" scrollRef={scrollRef}>
              <Text style={styles.caption}>{t(page.caption)}</Text>
              <Text accessibilityRole="header" style={[styles.title, { fontSize: width < 360 ? 31 : width > 500 ? 44 : 36, lineHeight: width > 500 ? 51 : 43 }]}>{t(page.title)}</Text>
              <Text style={styles.body}>{t(page.body)}</Text>
            </IntroMotion>
          </ScrollView>
        </View>)}
      </ScrollView>}
      <View style={styles.footer}>
        <View style={styles.dots}>{introPages.map((page, index) => <Pressable key={page.id} onPress={() => goTo(index)} accessibilityRole="button" accessibilityLabel={`${t('Page')} ${index + 1}`} accessibilityState={{ selected: index === active }} style={styles.dotButton}>
          <View style={[styles.dot, index === active && styles.currentDot]} />
        </Pressable>)}</View>
        <View style={styles.actions}>
          <Pressable accessibilityRole="button" accessibilityLabel={t('Back')} disabled={active === 0 || busy} onPress={() => goTo(active - 1)} style={[styles.back, active === 0 && { opacity: 0.25 }]}><ArrowLeft color={brand.colors.ink} size={23} /></Pressable>
          <Pressable accessibilityRole="button" disabled={busy || width === 0} accessibilityState={{ busy }} onPress={() => active === 4 ? finish() : goTo(active + 1)} style={({ pressed }) => [styles.next, pressed && { opacity: 0.8 }]}>
            <Text style={styles.nextText}>{t(active === 4 ? 'Get started' : 'Next')}</Text><ArrowRight size={21} color={brand.colors.paper} />
          </Pressable>
        </View>
      </View>
    </View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: brand.colors.paper }, shell: { flex: 1, width: '100%', maxWidth: 640, alignSelf: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 26, paddingVertical: 10 },
  wordmark: { flexDirection: 'row', alignItems: 'center', gap: 8 }, brand: { fontFamily: 'Outfit_500Medium', fontSize: 25, letterSpacing: -1, color: brand.colors.ink },
  skip: { minHeight: 48, minWidth: 48, justifyContent: 'center', alignItems: 'center' }, skipText: { fontFamily: 'Outfit_500Medium', fontSize: 15, color: brand.colors.muted },
  page: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 18, gap: 25 },
  caption: { fontFamily: 'Outfit_500Medium', fontSize: 13, color: '#86652F', marginBottom: 9 },
  title: { fontFamily: 'Outfit_500Medium', color: brand.colors.ink, letterSpacing: -1.1, marginBottom: 14 },
  body: { fontFamily: 'Outfit_400Regular', color: brand.colors.muted, fontSize: 16, lineHeight: 25, maxWidth: 490 },
  footer: { paddingHorizontal: 24, paddingBottom: 14, paddingTop: 4, gap: 2, backgroundColor: brand.colors.paper },
  dots: { flexDirection: 'row', justifyContent: 'center' }, dotButton: { minWidth: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#BBC7BB' }, currentDot: { width: 24, backgroundColor: brand.colors.ink },
  actions: { flexDirection: 'row', gap: 14 }, back: { width: 56, minHeight: 56, borderRadius: 18, borderWidth: 1, borderColor: brand.colors.line, alignItems: 'center', justifyContent: 'center' },
  next: { flex: 1, minHeight: 56, borderRadius: 18, backgroundColor: brand.colors.ink, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 14 },
  nextText: { fontFamily: 'Outfit_500Medium', color: brand.colors.paper, fontSize: 17 },
});
