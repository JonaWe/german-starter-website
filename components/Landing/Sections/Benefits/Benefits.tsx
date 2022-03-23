import { HiShieldCheck, HiUsers } from 'react-icons/hi';
import useLocalization from '../../../../hooks/useLocalization';
import Badge from '../../../UI/Badge';
import Card from './Card';

export default function Benefits() {
  const t = useLocalization();
  return (
    <section className="sm:mt-48 sm:m-10 max-w-screen-xl md:flex gap-10 items-center">
        <Card title="Ok" text="Ok" Icon={<HiShieldCheck />}/>
    </section>
  );
}
