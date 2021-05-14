import { Box, Heading, HTMLChakraProps, Text } from '@chakra-ui/react';
import React from 'react';
import { TextLink } from './TextLink';

export const NoProducts = (props: HTMLChakraProps<'aside'>) => (
  <Box as="aside" maxWidth="xl" mx="auto" textAlign="center" marginTop="4rem" {...props}>
    <Heading as="h1" size="xl" fontWeight="black">
      Add a product to get started.
    </Heading>

    <Text opacity="0.7" fontSize="lg" mt="6">
      Use the product search bar up top.
    </Text>
  </Box>
)
