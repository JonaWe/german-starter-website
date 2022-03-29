import { useState } from 'react';

import { Combobox } from '@headlessui/react';
import axios from 'axios';
import { useQuery } from 'react-query';
import SteamID from 'steamid';
import { useDebouncedCallback } from 'use-debounce';

const people = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 4, name: 'Benedict Kessler', unavailable: true },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
];

export default function ReportPlayer() {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [query, setQuery] = useState('');
  const [value, setValue] = useState([]);

  // const filteredPeople =
  //   query === ''
  //     ? people
  //     : people.filter((person) => {
  //         return person.name.toLowerCase().includes(query.toLowerCase());
  //       });

  const search = async (query: string) => {
    const data = await axios.post('/api/server/searchPlayerByName', {
      name: query,
    });
    return data;
  };

  const debounced = useDebouncedCallback((query) => {
    if (query.length < 4) return setValue([]);

    //const sid = new SteamID(query);

    //if (!sid.isValid())
    search(query).then((data) => {
      setValue(data.data.players);
    });
  }, 300);

  return (
    <div className="p-10">
      <Combobox value={selectedPerson} onChange={setSelectedPerson}>
        <Combobox.Input onChange={(e) => debounced(e.target.value)} />
        <Combobox.Options>
          {value &&
            value.map((person) => (
              <Combobox.Option key={person.steamid} value={person}>
                <p className="text-md">{person.name}</p>
                <p className="text-xs text-sand-500/60 font-light">
                  {person.steamid}
                </p>
              </Combobox.Option>
            ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
