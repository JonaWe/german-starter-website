// @ts-ignore
import SteamAuth from 'node-steam-openid';

const steamAuth = new SteamAuth({
  realm: 'http://localhost:3000', // Site name displayed to users on logon
  returnUrl: 'http://localhost:3000/api/steam/auth/authenticate', // Your return route
  apiKey: process.env.STEAM_API_KEY as string, // Steam API key
});

export default steamAuth;
