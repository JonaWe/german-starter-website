import { getDefaultLayout } from '../components/Layout/DefaultLayout';
import RuleBlock from '../components/Rules/RuleBlock';
import { useSetHeading } from '../context/defaultLayoutHeadingContext';
import useLocalization from '../hooks/useLocalization';
import type { NextPageWithLayout } from './_app';

const Rules: NextPageWithLayout = () => {
  const t = useLocalization();
  useSetHeading(t.rulesPage.title);
  return (
    <>
      {t.rulesPage.ruleSets.map(({ title, rules, note }, ruleIndex) => {
        return (
          <RuleBlock
            title={title}
            rules={rules}
            comment={note}
            key={ruleIndex}
            ruleIndex={ruleIndex + 1}
          />
        );
      })}
    </>
  );
};

Rules.getLayout = getDefaultLayout('/assets/images/rules_banner.jpg');

export default Rules;
