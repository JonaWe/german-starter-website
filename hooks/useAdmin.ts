import { useEffect, useState } from 'react';

import { User } from 'firebase/auth';


export default function useAdmin(user: User) {
  const [admin, setAdmin] = useState<null | User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    user.getIdTokenResult().then((res) => {
      if (res.claims.admin) {
        setAdmin(user);
        setLoading(false);
      }
    });
  }, [user]);

  return [admin, loading];
}
