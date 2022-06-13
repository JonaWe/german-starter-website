import { Children, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { HiEye, HiEyeOff, HiMap } from 'react-icons/hi';

import useLocalization from '../../hooks/useLocalization';
import Tooltip from '../UI/Tooltip';

export default function Map({
  map,
  showBtn,
  children,
  reload,
}: {
  map: any;
  reload: () => void;
  showBtn?: boolean;
  children?: React.ReactNode;
}) {
  const [showLabels, setShowLabels] = useState(false);

  const t = useLocalization();

  return (
    <>
      {children}
      {showBtn && (
        <Tooltip
          text={showLabels ? t.map.hideLabels : t.map.showLabels}
          className="absolute z-10 left-5 top-5"
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
      )}
      <AnimatePresence>
        {showLabels && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            src={map?.imageLabeled}
            alt="map"
            className="absolute inset-0"
          />
        )}
      </AnimatePresence>
      <img
        src={'/assets/images/map_overlay.png'}
        alt="map"
        className="absolute"
      />
      {map && map.imageUnlabeled ? (
        <img src={map?.imageUnlabeled} alt="map" className="w-full h-full" />
      ) : (
        <div className="w-[448px] aspect-square flex items-center justify-center">
          <Tooltip text={t.from.general.retry}>
            <button onClick={reload}>
              <HiMap className="fill-background-150 text-6xl animate-pulse" />
            </button>
          </Tooltip>
        </div>
      )}
    </>
  );
}
