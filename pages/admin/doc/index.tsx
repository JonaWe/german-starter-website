import { GetServerSideProps } from 'next';

import Markdown from 'markdown-to-jsx';

import { getAdminLayout } from '../../../components/Layout/AdminLayout';
import Button from '../../../components/UI/Button';
import { useSetHeading } from '../../../context/defaultLayoutHeadingContext';
import useLocalization from '../../../hooks/useLocalization';
import { octokit } from '../../../lib/octokit';
import { NextPageWithLayout } from '../../_app';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data } = await octokit.request(
    'GET /repos/{owner}/{repo}/contents/{path}',
    {
      owner: 'JonaWe',
      repo: 'german-starter-website',
      path: 'README.md',
    }
  );

  return {
    props: { readme: data },
  };
};

const AdminDoc: NextPageWithLayout = (props: any) => {
  const t = useLocalization();
  useSetHeading('Documentation');

  const { readme } = props;

  console.log(readme);

  const readmeContent = Buffer.from(readme.content, 'base64').toString();

  return (
    <div className='pb-10'>
      <div className="prose prose-invert prose-blockquote:border-background-150 prose-a:text-blue-500 prose-li:marker:text-background-150 mx-auto w-full">
        <Markdown>{readmeContent}</Markdown>
      </div>
      <Button useLink href={readme.html_url} text="View on Github" />
    </div>
  );
};

AdminDoc.getLayout = getAdminLayout;

export default AdminDoc;
