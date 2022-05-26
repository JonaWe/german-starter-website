import Markdown from 'markdown-to-jsx';

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
      className="relative mt-20 grid max-w-screen-xl md:gap-x-3 gap-x-1 gap-y-4 bg-background-400 md:px-14 px-3 pt-10 pb-7"
      style={{ gridTemplateColumns: 'min-content auto' }}
    >
      <Badge text={title} className="absolute -translate-y-6 translate-x-8" />
      {rules.map((rule, index) => {
        return (
          <>
            <p className="justify-self-end font-bold" key={index}>
              §{ruleIndex}.{index + 1}
            </p>{' '}
            <Markdown key={(index + 1) * 100} options={{ forceInline: true }}>
              {rule}
            </Markdown>
          </>
        );
      })}
      {comment && (
        <p className="col-span-2 mb-3 italic opacity-80">{comment}</p>
      )}
    </section>
  );
}
