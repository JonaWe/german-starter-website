import { useRouter } from 'next/router';
import { ChangeEventHandler } from 'react';

export default function LanguageSelection() {
  const router = useRouter();
  const { locale } = router;

  const changeLanguage: ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    const locale = e.target.value;
    router.push(router.asPath, undefined, { locale });
  };
  return (
    <select
      onChange={changeLanguage}
      defaultValue={locale}
      className="text-sand-500 text-xl font-bebas bg-transparent [text-shadow:0_4px_8px_rgba(0,0,0,0.12)]"
    >
      <option value="de">DE</option>
      <option value="en">EN</option>
    </select>
  );
}
