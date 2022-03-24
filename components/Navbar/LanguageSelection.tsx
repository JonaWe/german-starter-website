import { useRouter } from 'next/router';
import { useState } from 'react';

export default function LanguageSelection() {
  const router = useRouter();
  const { locale } = router;
  const [currentLocale, setCurrentLocale] = useState(locale);

  const changeLocale = (newLocale: string) => {
    setCurrentLocale(newLocale);
    router.push(router.asPath, undefined, { locale: newLocale });
  };
  return (
    <div className="grid grid-cols-2 divide-x-2">
      <button
        className={`px-2 text-2xl transition-colors hover:text-sand-500/100 ${
          currentLocale === 'de' ? 'text-sand-500/100' : 'text-sand-500/80'
        }`}
        onClick={() => changeLocale('de')}
      >
        DE
      </button>
      <button
        className={`px-2 text-2xl transition-colors hover:text-sand-500/100 ${
          currentLocale === 'en' ? 'text-sand-500/100' : 'text-sand-500/80'
        }`}
        onClick={() => changeLocale('en')}
      >
        EN
      </button>
    </div>
  );
}
