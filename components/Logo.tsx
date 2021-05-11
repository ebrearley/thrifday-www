import { Box, Flex, HTMLChakraProps, Text } from '@chakra-ui/react';


export const Logo = ({ ...restProps }: HTMLChakraProps<'div'>) => (
  <Box rounded="sm" width="6rem" height="100%" {...restProps}>
    <Flex height="100%" alignItems="center">
      <Box backgroundColor="teal.300" rounded="md" width="2rem" height="2rem" flexShrink={0}></Box>
      <Text fontSize="md" fontWeight="medium" paddingX="4" paddingY="2">
        ThrifDay
      </Text>
    </Flex>
  </Box>
);
