import Link from 'next/link';

import { FaDiscord, FaGithub, FaSteam } from 'react-icons/fa';

import NavItems from '../Navbar/NavItems';
import PageContent from '../PageContent';

export default function Footer() {
  return (
    <footer className="w-full mt-40 h-64 bg-background-700">
      <PageContent className="h-full">
        <div className="flex justify-between flex-col h-full pt-16">
          <div className="flex justify-center text-center flex-col">
            <Link href="#">
              <a>
                <h3 className="text-5xl text-center mb-5 hover:opacity-70 transition-opacity">
                  German Starter
                </h3>
              </a>
            </Link>
            <NavItems />
          </div>
          <div className="flex justify-between items-center py-5">
            <h3 className="opacity-60">
              © Copyright 2022 All Rights Reserved by german-starter.eu, SUMIS
              and Jona.
            </h3>
            <ul className='flex gap-5'>
              <li>
                <FaDiscord />
              </li>
              <li>
                <FaGithub />
              </li>
              <li>
                <FaSteam />
              </li>
            </ul>
          </div>
        </div>
      </PageContent>
    </footer>
  );
}
