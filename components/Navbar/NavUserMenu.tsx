import React from 'react';

import Link from 'next/link';

import { Menu, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../firebase/clientApp';
import useLocalization from '../../hooks/useLocalization';
import NavUserMenuPopout from './NavUserMenuPopout';

export default function NavUserMenu() {
  const t = useLocalization();

  const [user, loading] = useAuthState(auth);

  if (!user) {
    return (
      <div
        className={`divide-x-2 font-bebas ${
          loading ? 'opacity-0' : 'opacity-100'
        } transition-opacity`}
      >
        <Link href="/signin">
          <a className="px-2 text-2xl transition-colors hover:text-sand-500">
            {t.signIn.title}
          </a>
        </Link>
        <Link href="/signup">
          <a className="px-2 text-2xl transition-colors hover:text-sand-500">
            {t.signIn.signUp}
          </a>
        </Link>
      </div>
    );
  } else if (user.photoURL) {
    return (
      <Menu className="relative" as="div">
        <Menu.Button>
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={user.photoURL}
            alt="avatar"
            className="w-12 shadow-md hover:scale-105 scale-100 transition-transform duration-200"
          />
        </Menu.Button>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-175"
          enterFrom="opacity-0 -translate-y-3"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-3"
        >
          <Menu.Items className="absolute z-10 right-0" as="div">
            <NavUserMenuPopout user={user} />
          </Menu.Items>
        </Transition>
      </Menu>
    );
  } else {
    return null;
  }
}
