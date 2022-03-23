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
    <div className="divide-x-2 grid grid-cols-2">
      <button
        className={`text-2xl px-2 ${
          currentLocale === 'de' ? 'text-sand-500/100' : 'text-sand-500/80'
        }`}
        onClick={() => changeLocale('de')}
      >
        DE
      </button>
      <button
        className={`text-2xl px-2 ${
          currentLocale === 'en' ? 'text-sand-500/100' : 'text-sand-500/80'
        }`}
        onClick={() => changeLocale('en')}
      >
        EN
      </button>
    </div>
  );
}
