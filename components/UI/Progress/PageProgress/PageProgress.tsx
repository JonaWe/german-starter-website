import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useNProgress } from '@tanem/react-nprogress';

import { useProgressStore } from '../../../../store/useProgressStore';
import Bar from './PageProgressBar';
import Container from './PageProgressContainer';

export default function PageProgress() {
  const setIsAnimating = useProgressStore((state: any) => state.setIsAnimating);
  const isAnimating = useProgressStore((state: any) => state.isAnimating);

  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true);
    };

    const handleStop = () => {
      setIsAnimating(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating: isAnimating,
  });
  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      <Bar progress={progress} animationDuration={animationDuration} />
    </Container>
  );
}
