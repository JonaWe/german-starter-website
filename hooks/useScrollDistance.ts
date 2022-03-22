import { useEffect, useState } from 'react';

export default function useScrollDistance() {
  const [scrollDistance, setScrollDistance] = useState<number>(0);

  // get the initial value
  useEffect(() => {
    setScrollDistance(document.documentElement.scrollTop);
  }, []);

  // update the value when the scroll event is fired
  useEffect(() => {
    const handleScroll = () => {
      setScrollDistance(document.documentElement.scrollTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollDistance]);

  return scrollDistance;
}
