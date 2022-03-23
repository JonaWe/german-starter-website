import {
  HiAcademicCap,
  HiAdjustments,
  HiChip,
  HiPhone,
  HiShieldCheck,
  HiShoppingCart,
  HiUsers,
} from 'react-icons/hi';
import useLocalization from '../../../../hooks/useLocalization';
import Card from './Card';

interface Benefit {
  title: string;
  text: string;
  id:
    | 'shop'
    | 'uptime'
    | 'easy'
    | 'activeAdmins'
    | 'reducedUpkeep'
    | 'hardware';
}

const icons = {
  shop: <HiShoppingCart />,
  uptime: <HiShieldCheck />,
  easy: <HiAcademicCap />,
  activeAdmins: <HiPhone />,
  reducedUpkeep: <HiAdjustments />,
  hardware: <HiChip />,
};

export default function Benefits() {
  const t = useLocalization();
  return (
    <section className="sm:mt-48 max-w-screen-xl flex flex-wrap gap-10 items-center justify-around gap-y-20 mx-auto p-5 sm:p-0">
      {t.benefits.map((benefit) => {
        return (
          <Card
            key={benefit.id}
            title={benefit.title}
            text={benefit.text}
            icon={icons[benefit.id]}
          />
        );
      })}
    </section>
  );
}
