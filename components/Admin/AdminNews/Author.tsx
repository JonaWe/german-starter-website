import usePublicUser from '../../../hooks/usePublicUser';

interface AuthorProps {
  id: string;
}

export default function Author({ id }: AuthorProps) {
  const [author] = usePublicUser(id);

  console.log(author);
  
  return <>{author?.displayName}</>;
}