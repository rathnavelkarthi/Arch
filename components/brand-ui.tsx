import { useEffect, useRef, useState, type PropsWithChildren } from 'react';
import { AccessibilityInfo, Animated, Pressable, ScrollView, StyleSheet, Text, View, type TextInputProps, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { brand } from '@/constants/brand';
import { BrandedLoader } from './branded-loader';

const c = brand.colors;
export function Page({ children }: PropsWithChildren) {
  return <SafeAreaView style={ui.page}><ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={ui.content}>{children}</ScrollView></SafeAreaView>;
}

export function Action({ label, onPress, busy = false, disabled = false, secondary = false }: {
  label: string; onPress: () => void; busy?: boolean; disabled?: boolean; secondary?: boolean;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const [reduceMotion, setReduceMotion] = useState(true);
  useEffect(() => {
    let active = true;
    AccessibilityInfo.isReduceMotionEnabled().then(value => { if (active) setReduceMotion(value); }).catch(() => {});
    const listener = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => { active = false; listener.remove(); };
  }, []);
  const animate = (toValue: number) => {
    if (reduceMotion) return;
    Animated.spring(scale, { toValue, useNativeDriver: true, speed: 35, bounciness: 0 }).start();
  };
  return <Animated.View style={{ transform: [{ scale }] }}>
    <Pressable accessibilityRole="button" accessibilityState={{ disabled: disabled || busy, busy }}
      disabled={disabled || busy} onPress={onPress} onPressIn={() => animate(0.98)} onPressOut={() => animate(1)}
      style={({ pressed }) => [ui.action, secondary && ui.secondary, (disabled || busy) && { opacity: 0.55 }, pressed && { opacity: 0.8 }]}>
      {busy ? <BrandedLoader compact label={label} /> : <Text style={[ui.actionText, secondary && { color: c.ink }]}>{label}</Text>}
    </Pressable>
  </Animated.View>;
}

export function Field({ label, ...props }: TextInputProps & { label: string }) {
  return <View style={ui.field}><Text style={ui.label}>{label}</Text><TextInput accessibilityLabel={label} placeholderTextColor={c.muted} {...props} style={[ui.input, props.style]} /></View>;
}

export function Notice({ children, error = false }: PropsWithChildren<{ error?: boolean }>) {
  return <Text accessibilityRole={error ? 'alert' : undefined} accessibilityLiveRegion="polite" style={[ui.notice, error && { color: c.error }]}>{children}</Text>;
}

export const ui = StyleSheet.create({
  page: { flex: 1, backgroundColor: c.paper },
  content: { padding: 24, paddingBottom: 48, width: '100%', maxWidth: 640, alignSelf: 'center', gap: 20, flexGrow: 1 },
  eyebrow: { color: c.accent, fontSize: 12, fontWeight: '700', letterSpacing: 2 },
  title: { color: c.ink, fontSize: 36, fontFamily: 'Outfit_500Medium', letterSpacing: -1, lineHeight: 43 },
  heading: { color: c.ink, fontSize: 22, fontFamily: 'Outfit_500Medium' },
  body: { color: c.muted, fontSize: 16, lineHeight: 25, fontFamily: 'Outfit_400Regular' },
  card: { backgroundColor: c.surface, borderRadius: 24, padding: 24, gap: 18, borderWidth: 1, borderColor: c.line },
  field: { gap: 8 }, label: { color: c.ink, fontSize: 14, fontWeight: '600' },
  input: { minHeight: 54, borderWidth: 1, borderColor: c.line, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, color: c.ink, fontSize: 16, backgroundColor: c.surface },
  action: { minHeight: 54, borderRadius: 14, alignItems: 'center', justifyContent: 'center', padding: 14, backgroundColor: c.accent },
  secondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: c.line },
  actionText: { color: c.paper, fontSize: 16, fontFamily: 'Outfit_600SemiBold', textAlign: 'center' },
  notice: { fontSize: 14, lineHeight: 22, color: c.muted },
  link: { color: c.ink, fontWeight: '600', fontSize: 15, paddingVertical: 12 },
});
