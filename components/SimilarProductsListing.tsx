import { Box, Center, Heading, Spinner, Collapse, Stack } from "@chakra-ui/react";
import { head, isUndefined, join, map, orderBy } from "lodash";
import React from "react";
import { MonitoredProductFragment, ProductPriceFragment, RetailerEnum } from "../@types/generated";
import { useProductSearch } from "../hooks/useProductSearch";
import formatAmount from "../utils/formatAmount";
import { TextLink } from "./TextLink";

interface SimilarProuctsListingProps {
  monitoredProduct: MonitoredProductFragment;
}

export const SimilarProuctsListing = ({ monitoredProduct }: SimilarProuctsListingProps) => {
  const searchTerm = head(monitoredProduct?.retailerProducts)?.name || monitoredProduct?.name;
  const { products, isLoading, error } = useProductSearch({
    searchTerm,
    retailers: [RetailerEnum.Iga, RetailerEnum.Woolworths],
    queryArgs: {
      skip: isUndefined(searchTerm),
    },
  });

  const similarProducts = map(products, (product) => (
    <Box key={product.id}>
      <TextLink href={product.productPageUrl} inNewTab>
        {product.retailer}: {product.name} {product.packageSize}
      </TextLink>
    </Box>
  ));

  return (
    <Box>
      <Heading size="sm">Similar products</Heading>
      <Box padding="1rem" marginTop="0.75rem" rounded="md" backgroundColor="gray.600">
        <Collapse animateOpacity in={isLoading}>
          <Center flexDirection="column">
            <Spinner marginBottom="0.5rem" />
            Finding similar products
          </Center>
        </Collapse>
        <Collapse animateOpacity in={!isLoading}>
          <Stack>
            {similarProducts}
          </Stack>
        </Collapse>
      </Box>
    </Box>
  );
};
