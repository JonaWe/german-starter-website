import { useRouter } from 'next/router';

import de from '../translations/de';
import en from '../translations/en';

export default function useLocalization() {
  const { locale } = useRouter();
  const translation = locale === 'de' ? de : en;
  return translation;
}
