import Image from 'next/image';
import Link from 'next/link';

export default function NavLogo() {
  return (
    <Link href="/">
      <a>
        <Image
          src="/assets/images/logo.png"
          height={50}
          width={50}
          alt="German Starter Logo"
        />
      </a>
    </Link>
  );
}
