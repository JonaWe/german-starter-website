import axios from 'axios';

import { auth } from '../../firebase/clientApp';

/**
 * Get axios with default auth header
 * @returns {Promise<any>} axios instance with default auth header
 */
export default async function getAxios() {
  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${await auth.currentUser?.getIdToken()}`;
  return axios;
}
