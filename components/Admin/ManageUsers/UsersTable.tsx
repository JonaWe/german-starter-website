import { useMemo } from 'react';

import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';

import { auth } from '../../../firebase/clientApp';
import getAxios from '../../../lib/axios';
import { NewsItemWithId } from '../../../pages/admin/news';
import BigDataTable from '../../UI/Table/BigDataTable';
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

  const fetchUsers = async (
    page: number,
    pageSize: number,
    query: string | null = null,
    sortBy: { desc: boolean; id: string }[]
  ) => {
    const offset = page * pageSize;

    const axios = await getAxios();

    const data = await axios.post('/api/admin/getAllUsers', {
      skip: offset,
      take: pageSize,
      query: query,
      orderBy: sortBy,
    });

    const res = {
      data: data.data.users,
    };

    return res;
  };

  return <BigDataTable columns={columns} fetchData={fetchUsers} />;

  // return <></>;
}
