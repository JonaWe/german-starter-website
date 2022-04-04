import Author from '../Author';

interface AuthorsCellProps {
  value: string[];
}

export default function AuthorsCell({ value: authors }: AuthorsCellProps) {
  return (
    <>
      {authors.map((id) => (
        <span key={id}>
          <Author id={id} />
        </span>
      ))}
    </>
  );
}
