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
    <section className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-around gap-10 gap-y-20 p-5 sm:mt-48 sm:p-0">
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
