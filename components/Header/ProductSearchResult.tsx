import { Box, Flex, HTMLChakraProps, Text, Link, Image } from '@chakra-ui/react';
import React from 'react';
import { RetailerProductFragment } from '../../@types/generated';
import formatAmount from '../../utils/formatAmount';
import { PriceBlock } from './PriceBlock';

interface ProductSearchResultProps extends HTMLChakraProps<'a'> {
  product: RetailerProductFragment;
}

export const ProductSearchResult = ({ product, ...restProps }: ProductSearchResultProps) => {
  const formatedPrice = formatAmount(product.latestPrice.value);

  return (
    <Link as="button" role="menuitem" {...restProps} rounded="md" padding="2" textAlign="left" _hover={{backgroundColor: 'gray.600'}} _focus={{backgroundColor: 'gray.500'}}>
      <Box display="flex">
        <Image width="4rem" height="4rem" marginRight="0.5rem" src={product.imageUrl} objectFit="contain" borderRadius="md" />
        <Box flexGrow={1} marginRight="1rem">
          <Box>{product.name}</Box>
          <Box>{product.packageSize}</Box>
        </Box>
        <PriceBlock price={product.latestPrice} previousPrice={product.latestPrice} unitPrice={product.unitPrice} />
      </Box>
    </Link>
  );
};
