interface NewsCommentProps {
  uid: string;
  comment: string;
  date: string;
}

export default function NewsComment({
  uid,
  date,
  comment,
}: NewsCommentProps) {
  return <>{comment}</>;
}
