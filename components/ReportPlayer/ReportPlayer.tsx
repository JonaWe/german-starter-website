import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import useLocalization from '../../hooks/useLocalization';
import SimpleListbox from '../UI/Listbox';
import { Player } from './Interfaces/Player';
import ReportSteps from './ReportSteps';
import SelectPlayer from './SelectPlayer';

export default function ReportPlayer() {
  const t = useLocalization();


  return (
    <>
      <ReportSteps />
    </>
  );
}
