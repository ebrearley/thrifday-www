import { Box, Center, Spinner } from '@chakra-ui/react';

interface LoadingBlockProps {
  children: React.ReactNode;
}

export const LoadingBlock = ({ children }: LoadingBlockProps) => (
  <Box paddingY="4rem">
    <Center flexDirection="column">
      {children}
      <Spinner marginTop="1rem" />
    </Center>
  </Box>
);
