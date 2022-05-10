import { useEffect, useState } from 'react';

import Link from 'next/link';
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
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { HiSparkles } from 'react-icons/hi';
import { SiGoogletranslate } from 'react-icons/si';
import { useDebouncedCallback } from 'use-debounce';
import * as yup from 'yup';

import { auth, db } from '../../firebase/clientApp';
import useButtonStyle from '../../hooks/useButtonStyle';
import publishNews from '../../lib/firebase/publishNews';
import { NewsItemWithId } from '../../pages/admin/news';
import AddUsers from '../AddUsers';
import NewsItem from '../News/NewsItem';
import Button from '../UI/Button';
import Tooltip from '../UI/Tooltip';
import LanguagePill from './LanguagePill';
import MarkdownEditorInputItem from './MarkdownEditorInputItem';

const schema = yup
  .object({
    title: yup.string().required('Title is required').min(5).max(35),
    content: yup.string().required('Content is required').min(10).max(10000),
    titleEn: yup.string().required('Title is required').min(5).max(35),
    contentEn: yup.string().required('Content is required').min(10).max(10000),
    announce: yup.boolean(),
  })
  .required();

export interface FormInput {
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  authors: string[];
  published: boolean;
  announce: boolean;
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
    setValue,
    getValues,
    control,
    formState: { errors, isDirty },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [contentTranslation, setContentTranslation] = useState('');
  const content = useWatch({ control, name: 'content' });

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
    setValue('announce', !newsItem.announced);
  }, [newsItem, setValue, user]);

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setLoading(true);

    const doc = await addNews(data);

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);

    setLoading(false);

    if (newsItem) return;
    router.push(`/admin/news/${doc?.id}`);
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
      //leave published as it is
      const newsItemRef = doc(newsRef, newsItem.__id);
      return await setDoc(newsItemRef, newItem, { merge: true });
    } else {
      //If creating new doc set published to false
      return await addDoc(newsRef, { ...newItem, published: false });
    }
  };

  const translateContent = useDebouncedCallback(async () => {
    const text = getValues('content');

    const token = await user?.getIdToken();

    if (text.length === 0) return setContentTranslation('');

    const res = await axios.post(
      '/api/admin/translate',
      {
        text,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setContentTranslation(res.data.text);
  }, 500);

  useEffect(() => {
    translateContent();
  }, [content, translateContent]);

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
            title="Titel"
            register={register}
            errors={errors}
            input="titleEn"
            as="input"
          >
            <LanguagePill text="EN" />
          </MarkdownEditorInputItem>
          <MarkdownEditorInputItem
            title="Content"
            register={register}
            errors={errors}
            input="content"
            className="resize-none h-2/5 overflow-y-auto scrollbar-thin scrollbar-thumb-background-300 scrollbar-track-background-200/20 hover:scrollbar-thumb-rust-400"
            as="textarea"
          />
          <MarkdownEditorInputItem
            title="Content"
            register={register}
            errors={errors}
            input="contentEn"
            placeholder={contentTranslation}
            className="resize-none h-2/5 overflow-y-auto scrollbar-thin scrollbar-thumb-background-300 scrollbar-track-background-200/20 hover:scrollbar-thumb-rust-400"
            as="textarea"
          >
            <LanguagePill text="EN" />
            {watch('content')?.length > 0 &&
              watch('contentEn').length === 0 &&
              contentTranslation && (
                <span>
                  <Tooltip text="Accept translation">
                    <button
                      type="button"
                      onClick={() => setValue('contentEn', contentTranslation)}
                    >
                      <HiSparkles className="text-2xl fill-yellow-300/80 hover:fill-yellow-300 animate-pulse ml-auto -m-2" />
                    </button>
                  </Tooltip>
                </span>
              )}
          </MarkdownEditorInputItem>
          <span className="w-fit ml-auto mt-2">
            <Tooltip text="Open in Google Translator">
              <a
                href={`https://translate.google.com/?hl=de&tab=TT&sl=de&tl=en&op=translate&text=${encodeURI(
                  watch('content')
                )}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <SiGoogletranslate className="text-xl fill-sand-500/70 hover:fill-sand-500 transition-colors cursor-pointer" />
              </a>
            </Tooltip>
          </span>
          <label className="text-sand-500 pb-1 mt-4" htmlFor={'author'}>
            Authors
          </label>
          <AddUsers
            value={watch('authors') || [user?.uid]}
            onChange={(authors) => setValue('authors', authors)}
          />
          {newsItem && !watch('published') && (
            <>
              <label className="text-sand-500 pb-1 mt-4" htmlFor={'announce'}>
                Announcement
              </label>
              <div className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  checked={watch('announce')}
                  {...register('announce')}
                  id="announce"
                  className="accent-rust-500"
                />
                <span className="text-sm">
                  Announce article in Discord when published
                </span>
              </div>
            </>
          )}
          <div className="mt-4 flex justify-between">
            <Button useLink href="/admin/news/" text={'cancel'} />
            <div className="flex justify-end gap-6">
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
                    publishNews(newsItem.__id, watch('announce'));
                  }}
                  text="publish"
                  primary
                  disabled={watch('published') && newsItem ? true : false}
                  className="w-fit disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-rust-500"
                />
              )}
            </div>
          </div>
        </form>
        <NewsItem
          title={watch('title') || 'Untitled'}
          content={watch('content') || 'No content'}
          authors={watch('authors') || [user?.uid]}
          releaseDate={Timestamp.fromDate(new Date())}
          className="h-fit mt-6"
        />
      </div>
    </main>
  );
}
