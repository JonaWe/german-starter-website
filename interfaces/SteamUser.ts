export interface SteamUser {
  steamid: string;
  username: string;
  avatar: {
    small: string;
    medium: string;
    large: string;
  };
}
