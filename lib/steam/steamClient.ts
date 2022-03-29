import SteamAPI from 'steamapi';

const steam = new SteamAPI(process.env.STEAM_API_KEY as string);

export { steam };
