import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import {
  Timestamp,
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from '@firebase/firestore';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { HiUserAdd } from 'react-icons/hi';
import * as yup from 'yup';

import { auth, db } from '../../firebase/clientApp';
import useButtonStyle from '../../hooks/useButtonStyle';
import publishNews from '../../lib/firebase/publishNews';
import { NewsItemWithId } from '../../pages/admin/news';
import AddUsers from '../AddUsers';
import NewsItem from '../News/NewsItem';
import Button from '../UI/Button';
import MarkdownEditorInputItem from './MarkdownEditorInputItem';

const schema = yup
  .object({
    title: yup.string().required('Title is required').min(5).max(35),
    content: yup.string().required('Content is required').min(10).max(10000),
    titleEn: yup.string().required('Title is required').min(5).max(35),
    contentEn: yup.string().required('Content is required').min(10).max(10000),
  })
  .required();

export interface FormInput {
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  authors: string[];
  published: boolean;
}

interface MarkdownEditorProps {
  newsItem?: NewsItemWithId;
}

const alertUser = (e: Event) => {
  e.preventDefault();
  e.returnValue = false;
};

export default function MarkdownEditor({ newsItem }: MarkdownEditorProps) {
  const {
    handleSubmit,
    register,
    watch,
    getValues,
    setValue,
    trigger,
    formState: { errors, isDirty },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (isDirty) window.addEventListener('beforeunload', alertUser);
    return () => {
      window.removeEventListener('beforeunload', alertUser);
    };
  }, [isDirty]);

  useEffect(() => {
    if (user) setValue('authors', [user?.uid]);

    if (!newsItem) return;

    setValue('title', newsItem.de.title);
    setValue('titleEn', newsItem.en.title);
    setValue('content', newsItem.de.content);
    setValue('contentEn', newsItem.en.content);
    setValue('published', newsItem.published);
    setValue('authors', newsItem.authors);
  }, [newsItem, setValue]);

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setLoading(true);

    const doc = await addNews(data);

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);

    setLoading(false);

    if (newsItem) return;
    router.push('/admin/news/' + doc?.id);
  };

  const addNews = async (data: FormInput) => {
    const newsRef = collection(db, 'news');

    const newItem = {
      de: {
        title: data.title,
        content: data.content,
      },
      en: {
        title: data.titleEn,
        content: data.contentEn,
      },
      releaseDate: newsItem?.releaseDate ?? serverTimestamp(),
      authors: data.authors,
    };

    if (newsItem) {
      //leafe published as it is
      const newsItemRef = doc(newsRef, newsItem.__id);
      return await setDoc(newsItemRef, newItem, { merge: true });
    } else {
      //If creating new doc set published to flase
      return await addDoc(newsRef, { ...newItem, published: false });
    }
  };

  return (
    <main className="min-h-screen h-full mb-10">
      <Toaster />
      <div className="w-full h-full grid grid-cols-2 gap-8">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <MarkdownEditorInputItem
            title="Titel"
            register={register}
            errors={errors}
            input="title"
            as="input"
          />
          <MarkdownEditorInputItem
            title="Titel [EN]"
            register={register}
            errors={errors}
            input="titleEn"
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
          <MarkdownEditorInputItem
            title="Content [EN]"
            register={register}
            errors={errors}
            input="contentEn"
            className="resize-none h-2/5 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-background-300 scrollbar-track-background-200/20 hover:scrollbar-thumb-rust-400"
            as="textarea"
          />
          <label className="text-sand-500 pb-1 mt-4" htmlFor={'author'}>
            Authors
          </label>
          <AddUsers
            value={watch('authors') || [user?.uid]}
            onChange={(authors) => setValue('authors', authors)}
          />
          <div className="flex justify-end gap-6 mt-4">
            <input
              type="submit"
              className={`${useButtonStyle(false)} w-fit cursor-pointer ${
                saved && '!bg-green-800'
              } disabled:opacity-30 disabled:cursor-not-allowed `}
              value={newsItem ? (saved ? 'saved' : 'save') : 'add'}
            />
            {newsItem && (
              <Button
                onClick={() => {
                  toast.success('Published');
                  publishNews(newsItem.__id);
                }}
                text="publish"
                primary
                disabled={watch('published') && newsItem ? true : false}
                className="w-fit disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-rust-500"
              />
            )}
          </div>
        </form>
        <NewsItem
          title={watch('title') || 'Untitled'}
          content={watch('content') || 'No content'}
          authors={watch('authors') || [user?.uid]}
          releaseDate={new Timestamp(new Date().getSeconds(), 0)}
          className="h-fit mt-6"
        />
      </div>
    </main>
  );
}
