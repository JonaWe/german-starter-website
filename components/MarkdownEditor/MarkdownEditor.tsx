import { useEffect, useRef, useState } from 'react';

import {
  Timestamp,
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from '@firebase/firestore';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { auth, db } from '../../firebase/clientApp';
import useButtonStyle from '../../hooks/useButtonStyle';
import { NewsItemWithId } from '../../pages/admin/news';
import NewsItem from '../News/NewsItem';
import Button from '../UI/Button';
import MarkdownEditorInputItem from './MarkdownEditorInputItem';

const schema = yup
  .object({
    title: yup.string().required('Title is required').min(5).max(35),
    content: yup.string().required('Content is required').min(10).max(10000),
  })
  .required();

export interface FormInput {
  title: string;
  content: string;
  published: boolean;
}

interface MarkdownEditorProps {
  newsItem?: NewsItemWithId;
}

export default function MarkdownEditor({ newsItem }: MarkdownEditorProps) {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!newsItem) return;

    setValue('title', newsItem.de.title);
    setValue('content', newsItem.de.content);
    setValue('published', newsItem.published);
  }, [newsItem, setValue]);

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const newsRef = collection(db, 'news');

    const newItem = {
      de: {
        title: data.title,
        content: data.content,
      },
      en: {
        title: data.title,
        content: data.content,
      },
      published: data.published,
      releaseDate: newsItem?.releaseDate ?? serverTimestamp(),
      authors: [auth.currentUser?.uid],
    };

    if (newsItem) {
      const newsItemRef = doc(newsRef, newsItem.__id);
      setDoc(newsItemRef, newItem, { merge: true });
    } else {
      addDoc(newsRef, newItem);
    }
  };

  return (
    <main className="px-8 h-full">
      <div className="w-full h-full grid grid-cols-2 gap-8">
        <form
          ref={formRef}
          className="flex flex-col"
          onSubmit={(e) => {
            handleSubmit(onSubmit)(e);
          }}
        >
          <MarkdownEditorInputItem
            title="Titel"
            register={register}
            errors={errors}
            input="title"
            as="input"
          />
          <MarkdownEditorInputItem
            title="Content"
            register={register}
            errors={errors}
            input="content"
            className="resize-none h-2/5 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-background-300 scrollbar-track-background-200/20 hover:scrollbar-thumb-rust-400"
            as="textarea"
          />
          <div className="flex justify-end gap-6 mt-4">
            <Button
              onClick={() => {
                formRef.current?.dispatchEvent(
                  new Event('submit', { cancelable: true, bubbles: false })
                );
              }}
              text="Save"
              className="w-fit"
            />
            <input
              type="submit"
              className={`${useButtonStyle(
                true
              )} w-fit hover:cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-rust-500`}
              value="Publish"
              disabled={watch('published')}
              // onClick={(e) => {
              //   e.preventDefault();
              //   setValue('published', true);
              //   formRef.current?.dispatchEvent(
              //     new Event('submit', { cancelable: true, bubbles: false })
              //   );
              // }}
            />
          </div>
        </form>
        <NewsItem
          title={watch('title') || 'Untitled'}
          content={watch('content') || 'No content'}
          releaseDate={new Timestamp(new Date().getSeconds(), 0)}
          className="h-fit mt-6"
        />
      </div>
    </main>
  );
}
