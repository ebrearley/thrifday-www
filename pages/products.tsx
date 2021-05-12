import { Stack } from '@chakra-ui/react';
import { map } from 'lodash';
import React from 'react';
import { MonitoredProduct } from '../components/MonitoredProduct';
import { useCurrentUser } from '../hooks/useCurrentUser';


export default function Products() {
  const { user, isLoading } = useCurrentUser();

  const monitoredProducts = map(user?.monitoredProducts || [], monitoredProduct => {
    return (
      <MonitoredProduct
        key={monitoredProduct.id}
        monitoredProduct={monitoredProduct}
      />
    )
  });
  return (
    <Stack>
      {monitoredProducts}
    </Stack>
  )
}
