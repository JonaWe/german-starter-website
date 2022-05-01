import useLocalization from '../../../../hooks/useLocalization';
import Card from './Card';

interface Benefit {
  title: string;
  text: string;
  id: 'easy' | 'activeAdmins' | 'reducedUpkeep';
}

export default function Benefits() {
  const t = useLocalization();
  return (
    <section className="sm:mx-auto mx-10 flex max-w-screen-xl items-stretch flex-wrap justify-around gap-10 sm:gap-y-20 gap-y-10 p-5 sm:mt-48 sm:p-0 mt-20">
      {t.benefits.map((b) => {
        const benefit = b as Benefit;
        return (
          <Card
            key={benefit.id}
            id={benefit.id}
            title={benefit.title}
            text={benefit.text}
          />
        );
      })}
    </section>
  );
}
