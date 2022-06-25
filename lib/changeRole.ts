import { RoleId } from '../data/AccessRoles';
import getAxios from './axios';

const changeRole = async (uid: string, role: RoleId) => {
  if (!uid) return;

  const axios = await getAxios();

  const res = await axios.post('/api/admin/setRole', {
    uid,
    role,
  });

  return res.status === 200;
};

export default changeRole;
