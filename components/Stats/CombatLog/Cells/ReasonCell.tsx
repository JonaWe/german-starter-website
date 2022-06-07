import { useState } from 'react';

import axios from 'axios';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';

import { FACEPUNCH_URLS } from '../../../../lib/constants';
import Tooltip from '../../../UI/Tooltip';
import { CellProps } from '../LogItem';

const fetchReason = async (reason: string) => {
  const { data } = await axios.get(`/api/rust/item?id=${reason}`);
  return data.data;
};

export default function ReasonCell({ value: reason }: CellProps) {
  //Some formats are applied based on experience with the facepunch wiki "api". I'm sure there are many cases that dont get handled.
  const formatted_reason = reason.replace('.deployed', '');

  const { data } = useQuery(
    ['reason', formatted_reason],
    () => fetchReason(formatted_reason),
    {
      retry: false,
    }
  );

  return (
    <Tooltip text={data?.description || reason}>
      <motion.a
        target={'_blank'}
        className={`px-2 rounded-full transition-all text-sm cursor-pointer font-bold inline-flex items-center gap-1 flex-row`}
        href={`${FACEPUNCH_URLS.RUST_ITEMS_WIKI_URL}/${formatted_reason}`}
      >
        {data && (
          <span className="w-6 aspect-square rounded-full bg-background-150 inline-flex items-center justify-center">
            <img
              src={`${FACEPUNCH_URLS.RUST_ITEMS_FILES_URL}/${formatted_reason}_256.png`}
              className="w-6 rounded-full inline-block"
            />
          </span>
        )}
        {data?.title || reason}
      </motion.a>
    </Tooltip>
  );
}
