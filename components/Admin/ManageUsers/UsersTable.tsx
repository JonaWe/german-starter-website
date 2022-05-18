import { useMemo } from 'react';

import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';

import { auth } from '../../../firebase/clientApp';
import { NewsItemWithId } from '../../../pages/admin/news';
import Table from '../../UI/Table/Table';
import EmailCell from './Cells/EmailCell';
import NameCell from './Cells/NameCell';
import RoleCell from './Cells/RoleCell';

export default function UsersTable() {
  const columns = useMemo(
    () => [
      { Header: 'Name', accessor: `displayName`, Cell: NameCell },
      { Header: 'E-Mail', accessor: `email`, Cell: EmailCell },
      { Header: 'Role', accessor: '_', Cell: RoleCell },
      { Header: 'Actions', accessor: '__id' },
    ],
    []
  );

  const [user] = useAuthState(auth);

  const fetchUsers = async () => {
    if (!user) return;
    const token = await user.getIdToken();
    const data = await axios.post(
      '/api/admin/getAllUsers',
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  };

  const { data, isLoading } = useQuery(['users'], () => fetchUsers());

  return (
    <Table
      columns={columns}
      data={isLoading ? Array(5).fill({}) : data?.data.users}
    />
  );
}
