import { ReactElement, useEffect } from 'react';

import { useRouter } from 'next/router';

import { AnimatePresence, motion } from 'framer-motion';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../firebase/clientApp';
import LoadingScreen from '../UI/LoadingScreen';

interface LayoutProps {
  children: React.ReactNode;
}

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

function UserLayout({ children }: LayoutProps) {
  const [user, loading] = useAuthState(auth);

  const router = useRouter();

  useEffect(() => {
    if (!(user || loading)) {
      router.push('/login');
    }
  }, [user, loading, router]);

  return (
    <AnimatePresence exitBeforeEnter>
      {user ? (
        <motion.div
          variants={variants} // Pass the variant object into Framer Motion
          initial="hidden" // Set the initial state to variants.hidden
          animate="enter" // Animated state to variants.enter
          exit="exit" // Exit state (used later) to variants.exit
        >
          {children}
        </motion.div>
      ) : (
        <motion.div
          variants={variants} // Pass the variant object into Framer Motion
          initial="hidden" // Set the initial state to variants.hidden
          animate="enter" // Animated state to variants.enter
          exit="exit" // Exit state (used later) to variants.exit
        >
          <LoadingScreen />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function getUserLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
}
