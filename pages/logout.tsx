import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useCurrentUser from '../hooks/useCurrentUser';
import useLogout from '../hooks/useLogout';


export default function Logout() {
  const { user } = useCurrentUser();
  const router = useRouter();
  const logout = useLogout();

  useEffect(() => {
    logout();
  }, []);

  return <div>Logging out</div>
}

