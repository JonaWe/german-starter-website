import React, { ReactElement, useState } from 'react';

import { DefaultLayoutHeadingContextProvider } from '../../context/defaultLayoutHeadingContext';
import PageContent from '../PageContent';
import PageHeader from '../PageHeader';

interface LayoutProps {
  children: React.ReactNode;
  imageURL: string;
}

function DefaultLayout({ children, imageURL }: LayoutProps) {
  const [heading, setHeading] = useState<string>('Title');
  return (
    <DefaultLayoutHeadingContextProvider value={{ setHeading }}>
      <PageHeader imageURL={imageURL}>
        <h1>{heading}</h1>
      </PageHeader>
      <PageContent>{children}</PageContent>
    </DefaultLayoutHeadingContextProvider>
  );
}

export function getDefaultLayout(imageURL: string) {
  return function getLayout(page: ReactElement) {
    return <DefaultLayout imageURL={imageURL}>{page}</DefaultLayout>;
  };
}
