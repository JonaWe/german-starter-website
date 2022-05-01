import AuthorPill from '../AuthorPill';

interface AuthorsCellProps {
  value: string[];
}

export default function AuthorsCell({ value: authors }: AuthorsCellProps) {
  return (
    <>
      {authors.map((id) => (
        <span key={id}>
          <AuthorPill id={id} />
        </span>
      ))}
    </>
  );
}
