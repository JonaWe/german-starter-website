import type { AppProps } from 'next/app';

import { NextSeo } from 'next-seo';
import { QueryClient, QueryClientProvider } from 'react-query';

import Layout from '../components/Layout';
import '../styles/globals.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextSeo
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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default MyApp;
