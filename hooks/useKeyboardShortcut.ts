import { useEffect } from 'react';

interface useKeyboardShortcutOptions {
  forceCtrl?: boolean;
  forceAlt?: boolean;
  forceShift?: boolean;
}

export default function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options: useKeyboardShortcutOptions = {
    forceCtrl: false,
    forceAlt: false,
    forceShift: false,
  }
) {
  const { forceCtrl, forceAlt, forceShift } = options;
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const ctrlCheck = forceCtrl ? event.ctrlKey || event.metaKey : true;
      const shiftCheck = forceShift ? event.shiftKey : true;
      const altCheck = forceAlt ? event.altKey : true;
      if (event.key === key && ctrlCheck && shiftCheck && altCheck) {
        callback();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);
}
