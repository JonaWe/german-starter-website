import React, { ReactHTML } from 'react';

import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { FormInput } from './MarkdownEditor';

interface MarkdownEditorInputItemProps<T> {
  register: UseFormRegister<FormInput>;
  input: T;
  title: string;
  errors: FieldErrors<FormInput>;
  as: keyof ReactHTML;
  className?: string;
  children?: React.ReactNode;
}

export default function MarkdownEditorInputItem<T extends keyof FormInput>({
  input,
  register,
  title,
  errors,
  as,
  className,
  children,
}: MarkdownEditorInputItemProps<T>) {
  return (
    <>
      <label className="text-sand-500 pb-1 mt-4" htmlFor={input}>
        {title}
        {children}
      </label>
      {React.createElement(as, {
        ...register(input),
        className,
        id: input,
        'aria-describedby': `${input}-error`,
        'aria-invalid': errors[input] !== undefined,
      })}
      {errors[input] && (
        <span className="text-red-500" id={`${input}-error`}>
          {(errors[input] as any).message}
        </span>
      )}
    </>
  );
}
