import { Combobox } from '@headlessui/react';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useQuery } from 'react-query';

import { Player } from './Interfaces/Player';

export default function ReportOption({ steamid, name }: Player) {
  const fetchPlayer = async () => {
    const data = await axios.post('/api/steam/getPlayerSummary', {
      steamid,
    });
    return data;
  };

  const { data } = useQuery(steamid, fetchPlayer);

  const avatar = data?.data.summary.avatar.small;

  return (
    <Combobox.Option
      key={steamid}
      value={{ steamid, name, avatar }}
      className="flex gap-2 hover:bg-background-400 cursor-pointer px-3 py-2"
    >
      <AnimatePresence>
        {data ? (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            src={avatar}
            alt="name"
            className="w-10 h-10"
          />
        ) : (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            src={
              'https://steamuserimages-a.akamaihd.net/ugc/885384897182110030/F095539864AC9E94AE5236E04C8CA7C2725BCEFF/'
            }
            alt="name"
            className="w-10 h-10"
          />
        )}
      </AnimatePresence>
      <div>
        <p className="text-md">{name}</p>
        <p className="text-xs text-sand-500/60 font-light">{steamid}</p>
      </div>
    </Combobox.Option>
  );
}
