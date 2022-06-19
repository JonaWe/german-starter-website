import { useEffect, useState } from 'react';

import { User } from 'firebase/auth';
import { useQuery } from 'react-query';

import getAxios from '../../lib/axios';

const fetchUser = async (uid: string) => {
  if (!uid) return null;

  const axios = await getAxios();
  const data = await axios.post('/api/admin/user?uid=' + uid);

  return data.data as User;
};

export default function useUser(uid: string) {
  const query = useQuery(['steamUser', uid], () => fetchUser(uid));
  return query;
}
