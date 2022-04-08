import { useState } from 'react';

import { Dialog } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { db } from '../../../firebase/clientApp';
import useButtonStyle from '../../../hooks/useButtonStyle';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';

const schema = yup
  .object({
    message: yup.string().required().min(6).max(100),
  })
  .required();

export default function ResolveModal({
  open,
  closeModal,
  ticketId,
}: {
  ticketId: string;
  open: boolean;
  closeModal: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const ticketsRef = collection(db, 'tickets');
    const ticketRef = doc(ticketsRef, ticketId);
    await setDoc(ticketRef, { status: 'resolved' }, { merge: true });
    closeModal()
    //TODO: send email to user with message
  });

  return (
    <Modal open={open} closeModal={closeModal}>
      <Dialog.Title as="h2" className="leading-6">
        Resolve Ticket
      </Dialog.Title>
      <form onSubmit={onSubmit} className="mt-2">
        <div className="flex flex-col">
          <label htmlFor="message" className="block mb-1 text-2xl font-bebas">
            message
          </label>
          <textarea id="message" rows={5} {...register('message')} />
          {errors.message && (
            <div className={`text-red-400 text-xs mt-2`}>
              {errors.message.message}
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-between">
          <Button onClick={closeModal} text="close" />
          <button type="submit" className={useButtonStyle(true)}>
            Resolve
          </button>
        </div>
      </form>
    </Modal>
  );
}
