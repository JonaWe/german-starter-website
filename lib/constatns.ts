const CONSTANTS = {
  DOMAIN:
    process.env.NODE_ENV === 'production'
      ? 'https://german-starter-website.vercel.app'
      : 'http://localhost:3000',
};

const STEAM_ID_LENGTH = 17;
const STEAM_APPID_RUST = '252490';
const PY_LOG_PATH = 'https://playerstats.german-starter.de/logging.log';

export default CONSTANTS;
export { STEAM_ID_LENGTH, STEAM_APPID_RUST, PY_LOG_PATH };
