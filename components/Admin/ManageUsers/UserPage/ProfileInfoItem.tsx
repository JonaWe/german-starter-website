import React from 'react';

export default function ProfileInfoItem({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="mb-2">
      <p className="text-xs opacity-50">{label}</p>
      <p className="leading-none">{value || '-'}</p>
    </div>
  );
}
