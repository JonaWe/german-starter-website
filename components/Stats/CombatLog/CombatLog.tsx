import LogItem from './LogItem';

export default function CombatLog() {
  return (
    <div className="flex gap-y-10 flex-col">
      <LogItem
        event="PVP_KILL"
        data={{
          player: '76561197960276119',
          entity: '76561198444282547',
          time: '2022-04-11T17:35:27+00:00',
          sleeper: true,
          reason: 'pvp_event',
        }}
        time={new Date('2022-06-01T14:33:43+00:00')}
      />
      <LogItem
        event="PVE_DEATH"
        data={{
          player: '76561197960276119',
          entity: null,
          time: '2022-04-12T17:35:27+00:00',
          sleeper: false,
          reason: 'Wolf trap',
        }}
        time={new Date('2022-05-01T17:33:43+00:00')}
      />
    </div>
  );
}
