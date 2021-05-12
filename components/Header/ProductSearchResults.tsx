import { Box, Flex, HTMLChakraProps, Text, Link, Image, Stack, Collapse, useOutsideClick } from '@chakra-ui/react';
import { map } from 'lodash';
import React from 'react';
import { RetailerProductFragment } from '../../@types/generated';
import { ProductSearchResult } from './ProductSearchResult';

interface ProductSearchResulsdProps extends HTMLChakraProps<'div'> {
  products: RetailerProductFragment[];
  isOpen: boolean;
  onOutsideClick: () => void;
  onProductSelect: (product: RetailerProductFragment) => void;
}

export const ProductSearchResults = ({ products, isOpen, onOutsideClick, onProductSelect, ...restProps }: ProductSearchResulsdProps) => {
  const productSearchResults = map(products, (product) => <ProductSearchResult key={product.id} product={product} onProductSelect={onProductSelect} />);
  const ref = React.useRef();
  useOutsideClick({
    ref: ref,
    handler: onOutsideClick
  })
  
  return (
    <Collapse animateOpacity in={isOpen}>
      <Box position="absolute" top="3rem" left="0" width="100%" maxWidth="40rem" backgroundColor="gray.700" rounded="md" ref={ref} {...restProps}>
        <Stack as="menu" paddingInlineStart="0" padding="1" marginBlock="0">
          {productSearchResults}
        </Stack>
      </Box>
    </Collapse>
  );
};
