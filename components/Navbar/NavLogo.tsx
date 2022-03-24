import Image from 'next/image';

export default function NavLogo() {
  return (
    <Image
      src="/assets/images/logo.png"
      height={50}
      width={50}
      alt="German Starter Logo"
    />
  );
}
