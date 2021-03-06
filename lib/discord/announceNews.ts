import axios from 'axios';
import { Auth } from 'firebase/auth';

export default async function announceNews(
  auth: Auth,
  titleEn: string,
  titleDe: string,
  id: string,
  previewImageUrl?: string
) {
  const user = auth.currentUser;

  if (!user) return;

  const token = await user.getIdToken();

  if (!token) return;

  const res = await axios.post(
    `/api/admin/discord/announceNews`,
    {
      author: { name: user.displayName, photoURL: user.photoURL },
      imageURL: previewImageUrl || '',
      titleEn,
      titleDe,
      id,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}
