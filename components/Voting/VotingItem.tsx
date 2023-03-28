import { useRouter } from 'next/router';

import { motion } from 'framer-motion';

import useLocalization from '../../hooks/useLocalization';
import ArrowButton from '../UI/ArrowButton';

interface VotingItemProps {
  imageURL: string | null;
  mapURL: string | null;
  votes: number | null;
  totalVotes: number | null;
  name: string | null;
  checked: boolean;
  isMostVoted: boolean;
}

export default function VotingItem({
  imageURL,
  name,
  mapURL,
  votes,
  totalVotes,
  checked,
  isMostVoted,
}: VotingItemProps) {
  const t = useLocalization();
  return (
    <div
      className={`bg-background-700 w-80 flex flex-col transition-all duration-300 hover:scale-105 outline-rust-500 border-spacing-2 outline-4 relative rounded-lg overflow-hidden ${
        checked
          ? 'scale-105 shadow-rust-500/40 shadow-2xl outline'
          : 'scale-100 hover:shadow-rust-500/10 hover:shadow-2xl'
      }`}
    >
      <div className="relative z-10 overflow-hidden">
        <div className="absolute bg-gradient-to-t from-background-700 -bottom-1 w-full h-1/3" />
        <img src={imageURL || ''} alt="map" className="" />
      </div>
      <div className="px-5 pb-5 pt-1 flex justify-between items-center bg-background-700">
        <div>
          <h2 className="-mb-2 text-4xl">{name}</h2>
          <span className="group inline-block">
            <ArrowButton
              text={t.voting.openInRustMaps}
              onClick={() => {
                if (mapURL) window.open(mapURL);
              }}
            />
          </span>
        </div>
      </div>
      <span className="bg-background-600 h-2">
        {votes && totalVotes && (
          <motion.div
            className={`h-full ${
              isMostVoted ? 'bg-rust-500' : 'bg-background-400'
            }`}
            initial={{
              width: 0,
            }}
            animate={{ width: `${(votes / totalVotes) * 100}%` }}
          />
        )}
      </span>
      {/* <div
        className={`absolute inset-0 bg-rust-500/50 transition-all -z-10 ${
          checked ? 'translate-x-2 translate-y-2' : ''
        }`}
      /> */}
    </div>
  );
}
