import type { IronSessionOptions } from 'iron-session';

import { SteamUser } from '../interfaces/SteamUser';

const options: IronSessionOptions = {
  cookieName: 'german-starter-cookie',
  password: process.env.SESSION_KEY as string,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

declare module 'iron-session' {
  interface IronSessionData {
    steamUser?: SteamUser | null;
  }
}

export { options };
