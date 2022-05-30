import { getAdminLayout } from '../../../components/Layout/AdminLayout';
import Button from '../../../components/UI/Button';
import { useSetHeading } from '../../../context/defaultLayoutHeadingContext';
import { auth } from '../../../firebase/clientApp';
import useLocalization from '../../../hooks/useLocalization';
import announceNews from '../../../lib/discord/announceNews';
import { NextPageWithLayout } from '../../_app';

const AdminExperimental: NextPageWithLayout = () => {
  const t = useLocalization();
  useSetHeading('Experimental');
  return (
    <>
      <Button
        text="announceNews"
        onClick={() =>
          announceNews(
            auth,
            'English title',
            'Deutschr Titel',
            '0QCvQjOt6tgrfVETSlDO'
          )
        }
      />
    </>
  );
};

AdminExperimental.getLayout = getAdminLayout;

export default AdminExperimental;
