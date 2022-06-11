import { useState } from 'react';

import { HiArrowsExpand, HiMap } from 'react-icons/hi';

import useLocalization from '../../hooks/useLocalization';
import Button from '../UI/Button';
import FullScreenMap from './FullScreenMap';
import Map from './Map';

interface RustMapProps {
  map: any;
  variant?: 'preview' | 'button';
}

export default function RustMap({ map, variant }: RustMapProps) {
  const t = useLocalization();

  const [fullMapOpen, setFullMapOpen] = useState(false);

  return (
    <>
      <FullScreenMap
        map={map}
        open={fullMapOpen}
        onClose={() => setFullMapOpen(false)}
      />
      {variant === 'button' ? (
        <Button text="Map" onClick={() => setFullMapOpen(true)}>
          <HiMap />
        </Button>
      ) : (
        <div className="relative w-52 aspect-square group hover:scale-105 transition-all">
          <HiArrowsExpand className="text-2xl absolute top-[50%] right-[50%] translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:scale-125 scale-90 z-20 duration-300 pointer-events-none" />
          <span
            onClick={() => setFullMapOpen(true)}
            className="absolute group-hover:bg-background-600/50 cursor-pointer inset-0 z-10 transition-colors duration-300 "
          />
          <Map map={map} />
        </div>
      )}
    </>
  );
}
