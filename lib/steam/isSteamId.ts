import SteamID from 'steamid';

export default function isSteamId(steamId: string) {
  let sid: SteamID;
  try {
    sid = new SteamID(steamId);
    return sid.isValid();
  } catch (err) {
    return false;
  }
}
