import { Box, Flex, HTMLChakraProps, Text, Link, Image } from '@chakra-ui/react';
import { ProductPriceFragment, RetailerProductFragment } from '../../@types/generated';
import formatAmount from '../../utils/formatAmount';

interface ProductSearchResultProps extends HTMLChakraProps<'div'> {
  price: ProductPriceFragment;
  previousPrice?: ProductPriceFragment;
  unitPrice?: string;
}

export const PriceBlock = ({ price, previousPrice, unitPrice, ...restProps }: ProductSearchResultProps) => {
  const isTheSamePrice = price?.value === previousPrice?.value;

  return (
    <Box display="flex" flexDirection="column" alignItems="sretch" justifyContent="center" paddingY="1" paddingX="2" rounded="md" backgroundColor="whiteAlpha.100" minWidth="6rem" textAlign="center" flexShrink={0} {...restProps}>
      <Text fontWeight="medium" fontSize="1.125rem">{formatAmount(price?.value)}</Text>
      {(previousPrice && !isTheSamePrice) && <Text fontSize="0.625rem">Was {formatAmount(previousPrice?.value)}</Text>}
      {unitPrice && <Text fontSize="0.75rem" marginTop="1">${unitPrice}</Text>}
    </Box>
  );
};
