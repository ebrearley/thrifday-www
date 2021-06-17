import { Box, Flex, HTMLChakraProps, Text } from '@chakra-ui/react';

interface LogoProps extends HTMLChakraProps<'div'> {
  isWordmarkTextHidden?: boolean;
}

export const Logo = ({ isWordmarkTextHidden = false, ...restProps }: LogoProps) => (
  <Box rounded="sm" height="100%" {...restProps}>
    <Flex height="100%" alignItems="center">
      <Box backgroundColor="teal.300" rounded="md" width="2rem" height="2rem" flexShrink={0}></Box>
      {!isWordmarkTextHidden && (<Text fontSize="md" fontWeight="medium" paddingX="4" paddingY="2">
        ThrifDay
      </Text>)}
    </Flex>
  </Box>
);
