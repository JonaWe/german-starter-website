const CONSTANTS = {
  DOMAIN:
    process.env.NODE_ENV === 'production'
      ? 'https://german-starter-website.vercel.app'
      : 'http://localhost:3000',
};

const STEAM_ID_LENGTH = 17;
const STEAM_APPID_RUST = '252490';

export default CONSTANTS;
export { STEAM_ID_LENGTH, STEAM_APPID_RUST };
