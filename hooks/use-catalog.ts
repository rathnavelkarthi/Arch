import { useEffect, useState } from 'react';
import { catalogError } from '@/lib/catalog';

export function useCatalog<T>(loader: (signal: AbortSignal) => Promise<T[]>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    setLoading(true); setError(null); setItems([]);
    loader(controller.signal).then(data => { if (active) setItems(data); }).catch(err => {
      if (active) setError(catalogError(err));
    }).finally(() => { clearTimeout(timeout); if (active) setLoading(false); });
    return () => { active = false; clearTimeout(timeout); controller.abort(); };
  }, [loader, attempt]);
  return { items, loading, error, retry: () => setAttempt(value => value + 1) };
}
