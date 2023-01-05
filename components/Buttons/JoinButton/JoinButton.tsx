import useDocumentDataFromCollectionOnce from '../../../hooks/useDocumentDataFromCollectionOnce';
import useLocalization from '../../../hooks/useLocalization';
import Button from '../../UI/Button';

export default function JoinButton() {
  const [value, loading, error] = useDocumentDataFromCollectionOnce(
    'config',
    'server'
  );

  const t = useLocalization();

  const serverIP =
    !loading && !error && value ? value.ip : '135.125.189.209:28015';

  return (
    <Button
      text={t.joinBtn}
      primary
      useLink
      href={`steam://connect/${serverIP}`}
    />
  );
}
