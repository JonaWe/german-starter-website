const body = (
  <ul className="p-0">
    {Array(3)
      .fill(0)
      .map((_, i) => (
        <li key={i}>hallo</li>
      ))}
  </ul>
);

export const tabs = [
  { title: 'A', body },
  { title: 'B', body },
  { title: 'C', body },
];
