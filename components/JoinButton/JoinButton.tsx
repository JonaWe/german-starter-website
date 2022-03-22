import useDocumentDataFromCollectionOnce from '../../hooks/useDocumentDataFromCollectionOnce';
import Button from '../UI/Button';

export default function JoinButton() {
  const [value, loading, error] = useDocumentDataFromCollectionOnce(
    'config',
    'server'
  );

  const serverIP =
    !loading && !error && value ? value.ip : '51.195.60.162:28015';

  return (
    <Button
      text="Join Server"
      primary
      useLink
      href={`steam://connect/${serverIP}`}
    />
  );
}
