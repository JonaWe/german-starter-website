import { auth } from 'firebase-admin';
import CommandPallet from '../CommandPallet';
import Navbar from '../Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <CommandPallet />
      <Navbar />
      {children}
    </>
  );
}
