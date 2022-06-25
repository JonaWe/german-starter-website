import { useEffect, useState } from 'react';

import { User } from 'firebase/auth';

import { ACCESS_ROLES, RoleId } from '../data/AccessRoles';
import { auth } from '../firebase/clientApp';

/**
 * Is used for Auth. The role us only updated after the users signs in. If you need the live role get it from the User in the DB (Should not be used for auth proposes)
 * @param user
 * @returns role - A role object
 */
export default function useRole(user: User | null) {
  const [role, setRole] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) user = auth.currentUser;
    if (!user) return;

    user.getIdTokenResult().then((res) => {
      if (res.claims.role) {
        setRole(ACCESS_ROLES[res.claims.role as RoleId]);
        setLoading(false);
      }
    });
  }, [user]);

  return [role, loading];
}
