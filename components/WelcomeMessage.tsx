import { Box, Heading, HTMLChakraProps, Text } from '@chakra-ui/react';
import React from 'react';


export const WelcomeMessage = (props: HTMLChakraProps<'aside'>) => (
  <Box as="aside" maxWidth="xl" paddingX="1rem" mx="auto" textAlign="center" {...props}>
    <Heading as="h1" size="xl" fontWeight="black">
      Stay up to date with the cheapest prices.
    </Heading>

    <Text opacity="0.7" fontSize="lg" mt="6">
      Thrifday helps you find the best prices and specials at Aussie retailers. Add your products and see the cheapest
      place you can buy them.
    </Text>
  </Box>
);
