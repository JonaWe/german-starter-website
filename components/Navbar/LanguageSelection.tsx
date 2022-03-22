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
    <select onChange={changeLanguage} defaultValue={locale}>
      <option value="de">DE</option>
      <option value="en">EN</option>
    </select>
  );
}
