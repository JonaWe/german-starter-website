import Badge from '../UI/Badge';

interface RuleBlockProps {
  title: string;
  rules: string[];
  comment?: string;
  ruleIndex: number;
}

export default function RuleBlock({
  title,
  rules,
  comment,
  ruleIndex,
}: RuleBlockProps) {
  return (
    <section
      className="relative mt-20 grid max-w-screen-xl gap-x-3 gap-y-4 bg-background-400 px-14 pt-10 pb-7"
      style={{ gridTemplateColumns: 'min-content auto' }}
    >
      <Badge text={title} className="absolute -translate-y-6 translate-x-8" />
      {rules.map((rule, index) => {
        return (
          <>
            <p className="justify-self-end font-bold" key={index}>
              §{ruleIndex}.{index + 1}
            </p>{' '}
            <p key={(index + 1) * 100}>{rule}</p>
          </>
        );
      })}
      {comment && <p className="col-span-2 mb-3 italic">{comment}</p>}
    </section>
  );
}
