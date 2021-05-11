import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useCurrentUser } from '../hooks/useCurrentUser';
import { useLogout } from '../hooks/useLogout';


export default function Logout() {
  const { user } = useCurrentUser();
  const router = useRouter();
  const [isReadyToLogout, setIsreadyToLogout] = useState(false) ;
  const logout = useLogout({ isReady: isReadyToLogout });

  useEffect(() => {
    if (user) {
      setIsreadyToLogout(true);
    }

    if (user && isReadyToLogout) {
      logout().then(() => {
        router.push('/login');
      });
    }
  }, [user, isReadyToLogout]);

  return <div>Logging out</div>
}

