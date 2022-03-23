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
    <section className="bg-background-400 relative px-14 pt-10 pb-7 max-w-screen-xl mt-20">
      <Badge text={title} className="absolute -translate-y-16 translate-x-8" />
      {rules.map((rule, index) => {
        return (
          <p className="text-sand-500 mb-3" key={index}>
            <span className="font-bold">
              §{ruleIndex}.{index + 1}
            </span>{' '}
            {rule}
          </p>
        );
      })}
      {comment && <p className="italic mb-3">{comment}</p>}
    </section>
  );
}
