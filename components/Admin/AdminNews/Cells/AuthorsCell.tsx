interface AuthorsCellProps {
  value: string[];
}

export default function AuthorsCell({ value: authors }: AuthorsCellProps) {
  return (
    <span>
      {authors.map((id) => (
        <span key={id}>{id}</span>
      ))}
    </span>
  );
}
