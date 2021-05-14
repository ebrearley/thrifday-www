import { Box, Heading, HTMLChakraProps, Text } from '@chakra-ui/react';
import React from 'react';
import { TextLink } from './TextLink';

export const NoSpecials = (props: HTMLChakraProps<'aside'>) => (
  <Box as="aside" maxWidth="xl" mx="auto" textAlign="center" marginTop="4rem" {...props}>
    <Heading as="h1" size="xl" fontWeight="black">
      Woah! None of your products are on special today?
    </Heading>

    <Text opacity="0.7" fontSize="lg" mt="6">
      Try adding more products or more retailers to each <TextLink href="/products">product</TextLink>.
    </Text>
  </Box>
)
