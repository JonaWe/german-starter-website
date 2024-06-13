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

const SERVER_IP = '88.214.57.27';
const SERVER_QUERY_PORT = '28016';
const SERVER_GAME_PORT = '28015';

const FACEPUNCH_URLS = {
  RUST_ITEMS_WIKI_URL: 'https://wiki.facepunch.com/rust/item',
  RUST_ITEMS_FILES_URL: 'https://files.facepunch.com/rust/item',
};

export {
  STEAM_ID_LENGTH,
  STEAM_APPID_RUST,
  PY_LOG_PATH,
  BASE_DOMAIN,
  GITHUB_URLS,
  FACEPUNCH_URLS,
  SERVER_IP,
  SERVER_QUERY_PORT,
  SERVER_GAME_PORT,
};
