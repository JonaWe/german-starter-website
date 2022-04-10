import { useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import useLocalization from '../../hooks/useLocalization';
import SimpleListbox from '../UI/Listbox';
import { Player } from './Interfaces/Player';
import ReportSteps from './ReportSteps';
import ReportTypeCard from './ReportTypeCard';
import SelectPlayer from './SelectPlayer';

export default function ReportPlayer() {
  const t = useLocalization();

  return (
    <>
      <ReportTypeCard
        image="/assets/images/oilrig_ak.png"
        title="Report"
        description="Report a player"
        href="/report/player"
      />
      <ReportTypeCard
        image="/assets/images/oilrig_ak.png"
        title="Report"
        description="Report a player"
        href="/report/player"
      />
      <ReportTypeCard
        image="/assets/images/oilrig_ak.png"
        title="Report"
        description="Report a player"
        href="/report/player"
      />
      {/* <ReportSteps /> */}
    </>
  );
}
