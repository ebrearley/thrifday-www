import { Stack, useDisclosure } from '@chakra-ui/react';
import { compact, map, some } from 'lodash';
import React, { useState, useEffect } from 'react';
import { MonitoredProductFragment } from '../@types/generated';
import { MonitoredProduct } from '../components/MonitoredProduct';
import { MonitoredProductDrawer } from '../components/MonitoredProductDrawer';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { LoadingBlock } from './LoadingBlock';

interface ProductListingProps {
  isSpecialOnly?: boolean;
}

export const ProductListing = ({ isSpecialOnly }: ProductListingProps) => {
  const [currentMonitoredProduct, setCurrentMonitoredProduct] = useState<MonitoredProductFragment | null>(null);
  const { user, isLoading } = useCurrentUser();
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false })

  const onMonitoredProductClick = (monitoredProduct: MonitoredProductFragment) => {
    setCurrentMonitoredProduct(monitoredProduct);
    onOpen();
  };

  useEffect(() => {
    if (!currentMonitoredProduct) {
      onClose();
    }
  }, [currentMonitoredProduct, isOpen]);

  if (isLoading) {
    return (
      <LoadingBlock>Loading {isSpecialOnly ? 'specials' : 'products'}</LoadingBlock>
    );
  }

  const monitoredProducts = compact(map(user?.monitoredProducts || [], monitoredProduct => {
    if (isSpecialOnly) {
      const isAnyRetailerProductOnSpecial = some(monitoredProduct.retailerProducts, { isOnSpecial: true });
      if (!isAnyRetailerProductOnSpecial) {
        return null;
      }
    }

    return (
      <MonitoredProduct
        key={monitoredProduct.id}
        monitoredProduct={monitoredProduct}
        onMonitoredProductClick={onMonitoredProductClick}
      />
    )
  }));

  return (
    <>
      <Stack>
        {monitoredProducts}
      </Stack>
      <MonitoredProductDrawer isOpen={isOpen} onClose={onClose} monitoredProduct={currentMonitoredProduct} />
    </>
  )
}
