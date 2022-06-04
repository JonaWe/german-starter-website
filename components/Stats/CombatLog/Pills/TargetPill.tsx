export default function TargetPill({ text }: { text: string }) {
  return (
    <span className="text-cyan-700 bg-cyan-700/5 px-2 py-0.5 rounded-full border border-cyan-700">
      {text}
    </span>
  );
}
