import { useCallback, useRef, useEffect } from 'react';
import { logger } from '@/utils';

export function usePerformance() {
  const renderCountRef = useRef(0);
  const lastRenderTimeRef = useRef(performance.now());

  const logRender = useCallback((componentName: string) => {
    const now = performance.now();
    const timeSinceLastRender = now - lastRenderTimeRef.current;
    renderCountRef.current++;
    
    logger.debug(`${componentName} rendered`, {
      renderCount: renderCountRef.current,
      timeSinceLastRender: `${timeSinceLastRender.toFixed(2)}ms`,
      timestamp: new Date().toISOString()
    });
    
    lastRenderTimeRef.current = now;
  }, []);

  const measurePerformance = useCallback((name: string, fn: () => void) => {
    const start = performance.now();
    fn();
    const end = performance.now();
    
    logger.debug(`Performance measurement: ${name}`, {
      duration: `${(end - start).toFixed(2)}ms`
    });
  }, []);

  useEffect(() => {
    const currentRenderCount = renderCountRef.current;
    
    return () => {
      logger.info('Component unmounted', {
        totalRenders: currentRenderCount
      });
    };
  }, []);

  return {
    logRender,
    measurePerformance,
    renderCount: renderCountRef.current
  };
}
