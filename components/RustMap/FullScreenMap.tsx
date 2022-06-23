import { Dialog } from '@headlessui/react';
import { HiX } from 'react-icons/hi';

import Modal from '../UI/Modal';
import Map from './Map';

export default function FullScreenMap({
  map,
  open,
  onClose,
  reload,
}: {
  map: any;
  open: boolean;
  reload: () => void;
  onClose: () => void;
}) {
  return (
    <Modal open={open} closeModal={onClose} className="!p-0">
      <Map map={map} showBtn reload={reload}>
        <button
          className="bg-background-500/80 hover:bg-background-500 transition-colors group p-3 absolute z-10 right-5 top-5"
          onClick={onClose}
        >
          <HiX className="fill-sand-500/70 group-hover:fill-sand-500 transition-colors pointer-events-none" />
        </button>
        <div className="absolute left-5 bottom-5 z-10 opacity-75">
          <h3 className="text-xl -mb-2">{map?.size}</h3>
          <p className="text-xs opacity-50">Size</p>
        </div>
      </Map>
    </Modal>
  );
}
