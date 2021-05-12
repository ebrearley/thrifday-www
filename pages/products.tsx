import React from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';


export default function Products() {
  const { user, isLoading } = useCurrentUser();
  return (
    <div>
      products
    </div>
  )
}
