import { Payload } from 'recharts/types/component/DefaultTooltipContent';

//Exact type instead of any but dose not work Payload<number, string>[];

export default function DeathsKillsChartTooltip({ payload }: { payload: any }) {
  console.log(payload);

  return (
    <div className="flex gap-3">
      <div>
        <p className="leading-none">{payload[0].value}</p>
        <p className="text-xs opacity-50">Kills</p>
      </div>
      <div>
        <p className="leading-none">{payload[1].value}</p>
        <p className="text-xs opacity-50">Deaths</p>
      </div>
    </div>
  );
}
