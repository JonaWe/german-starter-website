// @ts-ignore
import SteamAuth from 'node-steam-openid';

import { BASE_DOMAIN } from '../constants';

const steamAuth = new SteamAuth({
  realm: BASE_DOMAIN, // Site name displayed to users on logon
  returnUrl: `${BASE_DOMAIN}/api/steam/auth/authenticate`, // Your return route
  apiKey: process.env.STEAM_API_KEY as string, // Steam API key
});

export default steamAuth;
