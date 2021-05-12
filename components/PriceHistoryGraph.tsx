import { Box, Center, Heading } from "@chakra-ui/react";
import { head, join, map, orderBy } from "lodash";
import React from "react";
import { MonitoredProductFragment, ProductPriceFragment } from "../@types/generated";
import formatAmount from "../utils/formatAmount";

interface PriceHistoryGraphProps {
  monitoredProduct: MonitoredProductFragment;
}

export const PriceHistoryGraph = ({ monitoredProduct }: PriceHistoryGraphProps) => {
  if (!monitoredProduct) {
    return (
      <Box paddingY="5rem" marginTop="1rem" rounded="md" backgroundColor="gray.800">
        <Center>
          Some kind of price history graph here
        </Center>
      </Box>
    );
  }

  const firstRetailerPrices = head(monitoredProduct?.retailerProducts)?.prices;
  const orderedPrices = orderBy(firstRetailerPrices, ['observedAtDateTime'], ['asc']);
  const formattedPrices = join(map(orderedPrices, (price) => {
    return formatAmount(price.value);
  }), ', ');

  return (
    <Box>
      <Heading size="sm" marginTop="1rem">Price hisotry</Heading>
      <Box paddingY="1rem" marginTop="0.75rem" rounded="md" backgroundColor="gray.800">
        <Center flexDirection="column">
          Some kind of price history graph here.
          <Box>
            {formattedPrices}
          </Box>
        </Center>
      </Box>
    </Box>
  );
};
