import { Dialog, Transition } from '@headlessui/react';

export default function CommandPalletOverlay() {
  return (
    <Transition.Child
      enter="duration-200 ease-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="duration-200 ease-in"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Dialog.Overlay className="fixed inset-0 bg-background-500/80" />
    </Transition.Child>
  );
}
