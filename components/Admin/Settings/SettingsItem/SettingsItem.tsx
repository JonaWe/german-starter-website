import { useEffect, useState } from 'react';

import { Ring } from '@uiball/loaders';

import useServerConfig, {
  ServerSettings,
} from '../../../../hooks/useServerConfig';
import Button from '../../../UI/Button';

export default function SettingsItem({
  propertyName,
  title,
}: {
  propertyName: string;
  title: string;
}) {
  const [config, setConfig] = useServerConfig();
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (config) setValue(config[propertyName]);
  }, [config]);

  const handleSave = async () => {
    setLoading(true);

    const key = propertyName as keyof ServerSettings;

    await setConfig({
      [key]: value,
    });

    setLoading(false);
  };

  return (
    <>
      <h4 className="font-sans font-semibold">{title}</h4>
      <div className="flex items-center w-full gap-3">
        <input
          type="text"
          className="px-2 py-1 h-12 w-[70%]"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {config && value !== config[propertyName] && (
          <span className="flex gap-1">
            <Button text="Save" onClick={handleSave} disabled={loading}>
              {loading && <Ring color="#ffffff" size={20} />}
            </Button>
            <Button
              text="Cancel"
              onClick={() => setValue(config[propertyName])}
            />
          </span>
        )}
      </div>
    </>
  );
}
