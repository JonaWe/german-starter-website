import {
  HiAcademicCap,
  HiAdjustments,
  HiChip,
  HiPhone,
  HiShieldCheck,
  HiShoppingCart,
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
    <section className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-around gap-10 gap-y-20 p-5 sm:mt-48 sm:p-0">
      {t.benefits.map((benefit) => {
        return (
          <Card
            key={benefit.id}
            title={benefit.title}
            text={benefit.text}
            icon={icons[(benefit as Benefit).id]}
          />
        );
      })}
    </section>
  );
}
