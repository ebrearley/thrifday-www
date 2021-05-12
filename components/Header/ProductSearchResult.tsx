import { Box, HTMLChakraProps, Link, Image, Tag, HStack, Text } from '@chakra-ui/react';
import React from 'react';

import { RetailerProductFragment } from '../../@types/generated';
import { PriceBlock } from './PriceBlock';

interface ProductSearchResultProps extends HTMLChakraProps<'a'> {
  product: RetailerProductFragment;
  onProductSelect: (product: RetailerProductFragment) => void;
}

export const ProductSearchResult = ({ product, onProductSelect, ...restProps }: ProductSearchResultProps) => {
  return (
    <Link as="button" role="menuitem" {...restProps} rounded="md" padding="2" textAlign="left" onClick={() => onProductSelect(product)} _hover={{backgroundColor: 'gray.600'}} _focus={{backgroundColor: 'gray.500'}}>
      <Box display="flex">
        <Image width="4rem" height="4rem" marginRight="0.5rem" src={product.imageUrl} objectFit="contain" borderRadius="md" />
        <Box flexGrow={1} marginRight="1rem">
          <HStack alignItems="start">
            {product.isOnSpecial && <Box flexShrink={0}><Tag colorScheme="yellow">On special</Tag></Box>}
            <Text isTruncated>{product.name}</Text>
          </HStack>
          <Box>{product.packageSize}</Box>
        </Box>
        <PriceBlock price={product.latestPrice} previousPrice={product.previousPrice} unitPrice={product.unitPrice} />
      </Box>
    </Link>
  );
};
