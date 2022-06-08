import type { ReactElement, ReactNode } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { DefaultSeo } from 'next-seo';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { QueryClient, QueryClientProvider } from 'react-query';

import CommandPallet from '../components/CommandPallet';
import PageProgress from '../components/UI/Progress/PageProgress';
import '../styles/globals.css';

export type NextPageWithLayout<T = {}> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <SkeletonTheme baseColor="#373737" highlightColor="#555">
        <CommandPallet />
        <PageProgress />
        <DefaultSeo
          title="German Starter Server"
          description="German Starter Server"
          canonical="https://www.german-starter.de"
          openGraph={{
            url: 'https://www.german-starter.de',
            title: 'German Starter Server',
            description: 'German Starter Server',
            images: [
              {
                url: 'https://www.german-starter.de/assets/images/banner_bg.png',
                width: 1920,
                height: 1080,
                alt: 'German Starter Banner',
                type: 'image/png',
              },
            ],
          }}
        />
        {getLayout(<Component {...pageProps} />)}
      </SkeletonTheme>
    </QueryClientProvider>
  );
}

export default MyApp;
