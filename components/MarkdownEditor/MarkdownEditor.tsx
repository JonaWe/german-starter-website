import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import useDebounce from '../../hooks/useDebounce';
import useDebounceState from '../../hooks/useDebouncedState';
import NewsItem from '../News/NewsItem';

const schema = yup
  .object({
    title: yup.string().required().min(5).max(30),
    content: yup.string().required().min(10).max(10000),
  })
  .required();

export default function MarkdownEditor() {
  const { handleSubmit, register, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data.content, data.title);
  });

  return (
    <div className="w-full h-full grid grid-cols-2">
      <form className="flex flex-col px-8" onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input id="title" {...register('title')} />
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          className="resize-none"
          {...register('content')}
        />
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
