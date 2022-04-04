import usePublicUser from '../../../hooks/usePublicUser';

interface AuthorProps {
  id: string;
}

export default function Author({ id }: AuthorProps) {
  const [author] = usePublicUser(id);

  console.log(author);

  return (
    <span className="text-xs px-2.5 py-1.5 bg-sand-500/10 rounded-full border border-sand-500/50 text-sand-500/50 uppercase mr-2">
      {author?.displayName}
    </span>
  );
}
