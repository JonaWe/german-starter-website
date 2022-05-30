const BASE_DOMAIN =
  process.env.NODE_ENV === 'production'
    ? 'https://german-starter-website.vercel.app'
    : 'http://localhost:3000';

const STEAM_ID_LENGTH = 17;
const STEAM_APPID_RUST = '252490';
const PY_LOG_PATH = 'https://playerstats.german-starter.de/logging.log';
const GITHUB_URLS = {
  CONSTANTS_FILE:
    'https://github.com/JonaWe/german-starter-website/blob/main/lib/constatns.ts',
};

export {
  STEAM_ID_LENGTH,
  STEAM_APPID_RUST,
  PY_LOG_PATH,
  BASE_DOMAIN,
  GITHUB_URLS,
};
