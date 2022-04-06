import NewsComment from "./NewsComment";

interface NewsCommentsProps {
  id: string;
}

export default function NewsComments({ id }: NewsCommentsProps) {
  const comments: string[] = [];
  return <>{comments.map(() => {
      return <NewsComment uid={""} date={""} comment={""}/>
  })}</>;
}
