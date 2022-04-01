export default function useButtonStyle(primary: boolean) {
  return `font-bebas text-xl py-2 px-4 flex items-center gap-1 text-sand-500 transition duration-150 ${
    primary
      ? 'bg-rust-500 hover:bg-rust-600'
      : 'bg-background-300 hover:bg-background-300/40'
  }`;
}
