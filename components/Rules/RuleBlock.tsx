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
      className="bg-background-400 relative px-14 pt-10 pb-7 max-w-screen-xl mt-20 grid gap-x-3 gap-y-4"
      style={{ gridTemplateColumns: 'min-content auto' }}
    >
      <Badge text={title} className="absolute -translate-y-6 translate-x-8" />
      {rules.map((rule, index) => {
        return (
          <>
            <p className="font-bold justify-self-end" key={index}>
              §{ruleIndex}.{index + 1}
            </p>{' '}
            <p key={(index + 1) * 100}>{rule}</p>
          </>
        );
      })}
      {comment && <p className="italic mb-3 col-span-2">{comment}</p>}
    </section>
  );
}
