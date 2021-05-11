import { Box, Flex, HTMLChakraProps, Text } from '@chakra-ui/react';


export const Logo = ({ ...restProps }: HTMLChakraProps<'div'>) => (
  <Box rounded="sm" width="6rem" height="100%" {...restProps}>
    <Flex height="100%" alignItems="center">
      <Text fontSize="lg" fontWeight="medium" paddingX="4" paddingY="2" rounded="md">
        ThrifDay
      </Text>
    </Flex>
  </Box>
);
