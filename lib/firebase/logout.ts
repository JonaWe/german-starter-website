import { signOut } from 'firebase/auth';

import { auth } from '../../firebase/clientApp';

export default function logout() {
  signOut(auth)
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}
