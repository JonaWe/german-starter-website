import Link from 'next/link';

import { HiOutlineEmojiSad } from 'react-icons/hi';

export default function CombatLogError({ message }: { message: string }) {
  const reportLink = `/support/feedback?description=${
    'unable fetch log data: ' + message
  }`;
  return (
    <div className="h-96 flex items-center justify-center">
      <div className="flex items-center flex-col">
        <HiOutlineEmojiSad className="text-7xl stroke-background-150/40 " />
        <p className="text-background-150">
          Oh noo {':('} We were unable to load the log. Report this issue{' '}
          <Link href={reportLink}>
            <a className="hover:text-rust-500 underline transition-colors">
              here.
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
}
