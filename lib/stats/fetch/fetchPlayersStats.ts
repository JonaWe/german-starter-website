import axios from 'axios';

const fetchPlayersStats = async (
  page: number,
  pageSize: number,
  query: string | null = null,
  sortBy: { desc: boolean; id: string }[],
  timeOut?: number,
  wipeOnly?: boolean
) => {
  const offset = page * pageSize;

  try {
    const response = await axios.post('/api/stats', {
      skip: offset,
      take: pageSize,
      query: query,
      orderBy: sortBy,
      wipe: wipeOnly,
    });
    const data = await response.data;

    console.log(wipeOnly);

    return data;
  } catch (e) {
    throw new Error(`API error:${(e as Error)?.message}`);
  }
};

export { fetchPlayersStats };
