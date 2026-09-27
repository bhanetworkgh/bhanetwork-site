import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Whether an <img> has finished loading, for the skeleton behind it.
 *
 * Pages are pre-rendered, so an image can finish loading before React
 * hydrates and its load event is missed. The effect checks `complete` once
 * on mount to catch that; `onLoad` and `onError` catch the rest. An image
 * that fails still clears its skeleton — a shimmer that never stops would
 * look like it is still coming.
 */
export function useImageLoaded() {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const done = useCallback(() => setLoaded(true), []);
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);
  return { ref, loaded, onLoad: done, onError: done };
}
