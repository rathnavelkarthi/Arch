import { useRef, type PropsWithChildren, type RefObject } from 'react';
import type { ScrollView } from 'react-native';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(useGSAP, ScrollTrigger);
type Props = PropsWithChildren<{ active: boolean; kind: 'art' | 'text'; scrollRef: RefObject<ScrollView | null> }>;
export function IntroMotion({ children, active, kind, scrollRef }: Props) {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useGSAP(() => {
    if (!scope.current || reduced) return;
    if (kind === 'text') {
      if (active) gsap.fromTo(scope.current.children, { opacity: 0.1, y: 14 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power2.out' });
      return;
    }
    const scroller = scrollRef.current?.getScrollableNode();
    if (!(scroller instanceof HTMLElement)) return;
    gsap.fromTo(scope.current, { scale: 0.88, opacity: 0.25 }, {
      scale: 1, opacity: 1, ease: 'none',
      scrollTrigger: { trigger: scope.current, scroller, horizontal: true, start: 'left right', end: 'left left', scrub: 0.35 },
    });
    // Fade the artwork as it moves out of the horizontal viewport.
    gsap.to(scope.current, { opacity: 0.2, ease: 'none', immediateRender: false,
      scrollTrigger: { trigger: scope.current, scroller, horizontal: true, start: 'right center', end: 'right left', scrub: 0.35 },
    });
    ScrollTrigger.refresh();
  }, { scope, dependencies: [active, kind, reduced, scrollRef], revertOnUpdate: true });
  return <div ref={scope} style={{ width: '100%', minWidth: 0, display: 'flex', flexDirection: 'column' }}>{children}</div>;
}
