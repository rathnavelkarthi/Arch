import { useEffect, useRef, type PropsWithChildren, type RefObject } from 'react';
import { Animated, type ScrollView } from 'react-native';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export type IntroMotionProps = PropsWithChildren<{ active: boolean; kind: 'art' | 'text'; scrollRef: RefObject<ScrollView | null> }>;
export function IntroMotion({ children, active, kind }: IntroMotionProps) {
  const progress = useRef(new Animated.Value(1)).current;
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!active || reduced) { progress.setValue(1); return; }
    progress.setValue(0);
    const animation = Animated.timing(progress, { toValue: 1, duration: 550, useNativeDriver: true });
    animation.start();
    return () => animation.stop();
  }, [active, kind, progress, reduced]);
  return <Animated.View style={{ opacity: progress.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }),
    transform: kind === 'art' ? [{ scale: progress.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1] }) }] : [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) }] }}>{children}</Animated.View>;
}
