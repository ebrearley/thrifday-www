import { Box, Flex, HTMLChakraProps, Text, Link, Image, LinkBox, LinkOverlay, Heading } from '@chakra-ui/react';
import { first } from 'lodash';
import React from 'react';
import { MonitoredProductFragment } from '../@types/generated';
import { PriceBlock } from './Header/PriceBlock';

interface ProductSearchResultProps extends HTMLChakraProps<'div'> {
  monitoredProduct: MonitoredProductFragment;
}

export const MonitoredProduct = ({ monitoredProduct, ...restProps }: ProductSearchResultProps) => {
  const mainRetailerProduct = first(monitoredProduct.retailerProducts);
  if (!mainRetailerProduct) {
    return null;
  }

  const onMonitoredProductClick = () => {
    console.log(monitoredProduct);
  }

  return (
    <Box as="article" display="flex" rounded="md" padding="2" backgroundColor="gray.700" {...restProps}>
      <Image width="4.5rem" height="4.5rem" marginRight="1rem" src={mainRetailerProduct.imageUrl} objectFit="contain" borderRadius="md" />
      <Box flexGrow={1} marginRight="1rem">
        <Heading size="sm" marginBottom="1"><Link onClick={onMonitoredProductClick}>{mainRetailerProduct.name}</Link></Heading>
        <Box>{mainRetailerProduct.packageSize}</Box>
        <Box>{mainRetailerProduct.retailer}</Box>
      </Box>
      <PriceBlock price={mainRetailerProduct.latestPrice} previousPrice={mainRetailerProduct.previousPrice} unitPrice={mainRetailerProduct.unitPrice} />
    </Box>
  );
};
