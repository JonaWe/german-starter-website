import { withOGImage } from 'next-api-og-image';

import { BebasNeue } from '../../../fonts';

interface QueryParams {
  name: string;
  steamid: string;
  avatar: string;
  local: 'en' | 'de';
}

const style = `
  @layer utilities {
    @font-face {
      font-family: 'Bebas Neue';
      font-style:  normal;
      font-weight: normal;
      src: url(data:font/woff2;charset=utf-8;base64,${BebasNeue}) format('woff2');
    }
    main {
      padding: 80px;
    }
  }
`;

const script = `
tailwind.config = {
  theme: {
    extend: {
      colors: {
        rust: '#cd412b',
        background: '#1b1b1b',
        sand:'#fffbf6'
      }
    }
  }
}
`;

export default withOGImage<'query', QueryParams>({
  template: {
    react: ({ name, steamid, avatar, local }) => {
      return (
        <html>
          <head>
            <style dangerouslySetInnerHTML={{ __html: style }} />
            <script src="https://cdn.tailwindcss.com"></script>
            <script dangerouslySetInnerHTML={{ __html: script }} />
          </head>
          <body className="bg-background h-screen w-screen">
            <main className="relative h-full w-full">
              <div
                style={{
                  backgroundImage: `url(${avatar})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'absolute',
                  inset: '0px',
                  width: '100%',
                  height: '100%',
                }}
              />
              <div
                style={{
                  background:
                    'linear-gradient(0deg, rgba(8,8,8,1) 20%, rgba(16,16,16,0.80) 100%)',
                  position: 'absolute',
                  inset: '0px',
                  width: '100%',
                  height: '100%',
                }}
              />
              <div className="relative flex justify-between flex-col h-full">
                <div className="flex gap-7">
                  <img src={avatar} alt="avatar" width={120} />
                  <div>
                    <h1
                      className="text-8xl text-sand"
                      style={{ fontFamily: 'Bebas Neue' }}
                    >
                      {name}
                    </h1>
                    <p className="text-sand opacity-70 text-4xl font-bold">
                      {steamid}
                    </p>
                  </div>
                </div>
                <div className="flex text-4xl items-center gap-2 stroke-rust">
                  <h2 className="text-rust font-bold text-4xl">
                    {local === 'de' ? 'Profil ansehen' : 'View profile'}
                  </h2>
                  <svg
                    stroke="#cd412b"
                    fill="#cd412b"
                    stroke-width="0"
                    viewBox="0 0 20 20"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </main>
          </body>
        </html>
      );
    },
  },
  cacheControl: 'public, max-age=604800, immutable',
  dev: {
    inspectHtml: false,
  },
});
