interface CommentSectionProps {
    id: string;
    className?: string;
  }
  
  export default function NewsAddComment({ id }: CommentSectionProps) {
    return <>{id}</>;
  }
  