import { useState } from 'react';

import { RadioGroup } from '@headlessui/react';
import { collection, doc } from 'firebase/firestore';
import {
  useCollection,
  useDocument,
  useDocumentData,
} from 'react-firebase-hooks/firestore';

import { db } from '../../firebase/clientApp';
import getDataWithId from '../../lib/firebase/getDataWithId';
import VotingItem from './VotingItem';

export default function VotingItems({ id }: { id: string }) {
  const votingRef = doc(db, 'voting', id);
  const mapsRef = collection(db, 'voting', id, 'maps');
  const [selectedMap, setSelectedMap] = useState('startup');

  const [votingInfo, loadingInfo] = useDocumentData(votingRef);
  const [mapsSnap, loadingMap] = useCollection(mapsRef);

  const maps = getDataWithId(mapsSnap);

  return (
    <div>
      <RadioGroup
        value={selectedMap}
        onChange={setSelectedMap}
        className="flex gap-12"
      >
        {maps.map((map, i) => (
          <RadioGroup.Option
            key={map.__id}
            value={map.__id}
            className="cursor-pointer"
          >
            {({ checked }) => (
              <VotingItem
                checked={checked}
                name={map.name}
                imageURL={map.imgURL}
                mapURL={map.mapURL}
                votes={map.votes}
                totalVotes={votingInfo?.participants}
                isMostVoted={map.votes > votingInfo?.participants / maps.length}
              />
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </div>
  );
}
