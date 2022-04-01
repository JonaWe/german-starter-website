import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import useDebounce from '../../hooks/useDebounce';
import useDebounceState from '../../hooks/useDebouncedState';
import NewsItem from '../News/NewsItem';

const schema = yup
  .object({
    title: yup.string().required('Title is required').min(5).max(35),
    content: yup.string().required('Content is required').min(10).max(10000),
  })
  .required();

interface FormInput {
  title: string;
  content: string;
}

export default function MarkdownEditor() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data.content, data.title);
  };

  return (
    <div className="w-full h-full grid grid-cols-2">
      <form className="flex flex-col px-8" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title</label>
        <input id="title" {...register('title')} />
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          className="resize-none"
          {...register('content')}
        />
        {errors.content && (
          <span className="text-red-500">{errors.content.message}</span>
        )}
        <input type="submit" />
      </form>
      <NewsItem
        title={watch('title') || 'Untitled'}
        content={watch('content') || 'No content'}
        releaseDate={new Date()}
        className="h-fit"
      />
    </div>
  );
}
