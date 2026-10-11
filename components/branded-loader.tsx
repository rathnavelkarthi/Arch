import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { House } from 'lucide-react-native';
import { brand } from '@/constants/brand';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function BrandedLoader({ label = 'Architect Workspace & Procurement System', compact = false }: { label?: string; compact?: boolean }) {
  const pulse = useRef(new Animated.Value(0)).current;
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) { pulse.setValue(0.5); return; }
    const animation = Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 1, duration: 850, useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 0, duration: 850, useNativeDriver: true }),
    ]));
    animation.start();
    return () => animation.stop();
  }, [pulse, reduced]);
  return <View style={[styles.container, compact && styles.compact]} accessibilityRole="progressbar" accessibilityLabel={label} accessibilityState={{ busy: true }}>
    {!compact && <>
      <View style={styles.mark}><House size={44} color={brand.colors.ink} strokeWidth={1.25} /></View>
      <Text style={styles.wordmark}>Ilam Mora</Text>
      <Text style={styles.caption}>{label}</Text>
    </>}
    <View style={styles.dots}>{[0, 1, 2].map(index => <Animated.View key={index} style={[styles.dot, {
      opacity: pulse.interpolate({ inputRange: [0, 0.5, 1], outputRange: index === 1 ? [0.45, 1, 0.45] : index === 0 ? [1, 0.65, 0.3] : [0.3, 0.65, 1] }),
      transform: [{ translateY: pulse.interpolate({ inputRange: [0, 1], outputRange: [0, reduced ? 0 : -3] }) }],
    }]} />)}</View>
  </View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, minHeight: 180, backgroundColor: brand.colors.paper, alignItems: 'center', justifyContent: 'center', gap: 22 },
  compact: { flex: 0, minHeight: 28, backgroundColor: 'transparent', gap: 0 },
  mark: { width: 96, height: 96, borderRadius: 34, backgroundColor: '#E6EADF', alignItems: 'center', justifyContent: 'center' },
  wordmark: { color: brand.colors.ink, fontSize: 46, letterSpacing: -2, fontWeight: '500' },
  caption: { color: brand.colors.muted, fontSize: 15, letterSpacing: 1 },
  dots: { flexDirection: 'row', gap: 8, paddingVertical: 8 },
  dot: { height: 6, width: 6, borderRadius: 3, backgroundColor: '#BE9B61' },
});
