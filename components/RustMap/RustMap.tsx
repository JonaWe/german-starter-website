import { useState } from 'react';

import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useQuery } from 'react-query';

import useLocalization from '../../hooks/useLocalization';
import Tooltip from '../UI/Tooltip';

const fetchMap = async () => {
  const { data } = await axios.get('/api/server/map');
  return data;
};

export default function RustMap() {
  const { data: map } = useQuery('map', fetchMap, {
    refetchOnWindowFocus: false,
  });

  const [showLabels, setShowLabels] = useState(false);

  const t = useLocalization();

  return (
    <div>
      <div className="relative">
        <Tooltip
          text={showLabels ? t.map.hideLabels : t.map.showLabels}
          className="absolute z-10 right-5 top-5"
          options={{
            delay: 0.5,
          }}
        >
          <button
            className="bg-background-500/80 hover:bg-background-500 transition-colors group p-3"
            onClick={() => setShowLabels(!showLabels)}
          >
            {showLabels ? (
              <HiEyeOff className="fill-sand-500/70 group-hover:fill-sand-500 transition-colors pointer-events-none" />
            ) : (
              <HiEye className="fill-sand-500/70 group-hover:fill-sand-500 transition-colors pointer-events-none" />
            )}
          </button>
        </Tooltip>
        <AnimatePresence>
          {showLabels && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              src={map.imageLabeled}
              alt="map"
              className="absolute"
            />
          )}
        </AnimatePresence>
        <img
          src={'/assets/images/map_overlay.png'}
          alt="map"
          className="absolute"
        />
        <img src={map.imageUnlabeled} alt="map" className="" />
      </div>
    </div>
  );
}
