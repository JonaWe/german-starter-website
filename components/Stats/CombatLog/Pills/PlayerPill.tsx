export default function PlayerPill({ text }: { text: string }) {
  return (
    <span className="text-purple-700 bg-purple-700/5 px-2 py-0.5 rounded-full border border-purple-700">
      {text}
    </span>
  );
}
