import { Timestamp } from '@firebase/firestore';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import useButtonStyle from '../../hooks/useButtonStyle';
import NewsItem from '../News/NewsItem';
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
    <main className="px-8 h-full">
      <h1 className="text-6xl">Add a News Item</h1>
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
            title="Content"
            register={register}
            errors={errors}
            input="content"
            className="resize-none h-2/5 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-background-300 scrollbar-track-background-200/20 hover:scrollbar-thumb-rust-400"
            as="textarea"
          />
          <input
            type="submit"
            className={`${useButtonStyle(
              true
            )} w-fit mx-auto mt-4 hover:cursor-pointer`}
            value="Publish"
          />
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
