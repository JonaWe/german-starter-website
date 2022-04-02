export function checkIfSameDay(date: Date) {
  const now = new Date();
  return (
    now.getDate() === date.getDate() &&
    now.getMonth() === date.getMonth() &&
    now.getFullYear() === date.getFullYear()
  );
}
