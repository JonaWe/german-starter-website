/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'de',
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/en/api/:path*',
        destination: '/api/:path*',
        permanent: true,
      },
    ];
  },
};
