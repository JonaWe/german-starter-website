import useLocalization from '../hooks/useLocalization';
import { NextPage } from 'next';
import RuleBlock from '../components/Rules/RuleBlock';
import PageHeader from '../components/PageHeader';
import PageContent from '../components/PageContent/PageContent';

const Rules: NextPage = () => {
  const t = useLocalization();
  return (
    <>
      <PageHeader imageURL="/assets/images/rules_banner.jpg">
        <h1>{t.rulesPage.title}</h1>
      </PageHeader>
      <PageContent>
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
      </PageContent>
    </>
  );
};

export default Rules;
