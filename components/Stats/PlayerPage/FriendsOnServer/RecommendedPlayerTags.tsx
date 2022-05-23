import Pill from '../../../UI/Pill';
import { Tag } from './RecommendedPlayerCard';

export default function RecommendedPlayerTags({ tags }: { tags: Tag[] }) {
  return (
    <div className="flex gap-2">
      {tags.map(({ name, color }) => (
        <Pill
          name={name}
          className={
            color === 'yellow'
              ? `pill-yellow`
              : color === 'sand'
              ? `pill-sand`
              : color === 'blue'
              ? `pill-blue`
              : color === 'rust'
              ? `pill-rust`
              : `pill-green`
          }
        />
      ))}
    </div>
  );
}
