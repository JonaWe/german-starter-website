import { useRouter } from 'next/router';

import { motion } from 'framer-motion';

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
  return (
    <div
      className={`bg-background-700 w-80 flex flex-col transition-all duration-300 hover:scale-105 border-rust-500 group ${
        checked
          ? 'scale-105 shadow-rust-500/40 shadow-2xl'
          : 'scale-100 hover:shadow-rust-500/10 hover:shadow-2xl'
      }`}
    >
      <div className="relative">
        <div className="absolute bg-gradient-to-t from-background-700 -bottom-1 w-full h-1/3" />
        <img src={imageURL || ''} alt="map" className="w" />
      </div>
      <div className="px-5 pb-5 pt-1 flex justify-between items-center">
        <div>
          <h2 className="-mb-2 text-4xl">{name}</h2>
          <span className="group inline-block">
            <ArrowButton
              text={'maashalla mach auf'}
              onClick={() => {
                if (mapURL) window.open(mapURL);
              }}
            />
          </span>
        </div>
        <div className="text-4xl translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-40 transition-all py-2 px-3 bg-background-400/80 border-2">
          <h2 className="">{votes}</h2>
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
    </div>
  );
}
