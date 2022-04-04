import Author from '../Author';

interface AuthorsCellProps {
  value: string[];
}

export default function AuthorsCell({ value: authors }: AuthorsCellProps) {
  return (
    <>
      {authors.map((id) => (
        <span key={id} className="text-xs px-2.5 py-1.5 bg-gray-500/10 rounded-full border border-gray-500 text-gray-500 uppercase mr-2">
          <Author id={id} />
        </span>
      ))}
    </>
  );
}
