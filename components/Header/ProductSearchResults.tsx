import { Box, Flex, HTMLChakraProps, Text, Link, Image, Stack, Collapse, useOutsideClick, useMediaQuery } from '@chakra-ui/react';
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
  const [ isLargerThanMobile ] = useMediaQuery("(min-width: 600px)");

  useOutsideClick({
    ref: ref,
    handler: onOutsideClick
  });

  return (
    <Collapse animateOpacity in={isOpen}>
      <Stack
        as="menu"
        position={isLargerThanMobile ? 'absolute' : 'fixed' }
        top={isLargerThanMobile ? '3rem' : '4rem' }
        left={isLargerThanMobile ? 0 : '1rem' }
        width="100%"
        maxWidth={isLargerThanMobile ? '40rem' : 'calc(100vw - 2rem)' }
        backgroundColor="gray.700"
        rounded="md"
        ref={ref}
        paddingInlineStart="0"
        padding="1"
        marginBlock="0"
        overflowY="auto"
        maxHeight="calc(100vh - 7rem)"
        {...restProps}
      >
          {productSearchResults}
      </Stack>
    </Collapse>
  );
};
