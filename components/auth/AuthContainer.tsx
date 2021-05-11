import { Box, HTMLChakraProps, Heading, useToast, Center } from '@chakra-ui/react';
import Link from 'next/link'

import { ReactNode, useEffect } from 'react';
import { AuthType } from './@enums/AuthType';


interface AuthContainerProps extends HTMLChakraProps<'div'> {
  children: ReactNode;
  authType: AuthType;
  errorMessage?: string;
}

export const AuthContainer = ({ children, authType, errorMessage, ...restProps }: AuthContainerProps) => {
  const toast = useToast();

  const stringsDictionary = {
    [AuthType.Login]: {
      wrongPlaceQuestion: 'Don’t have an account?',
      wrongPlaceLinkLabel: 'Create one',
      wrongPlaceLinkPath: '/signup',
      errorToastTitle: 'Couldn’t log in',
      title: 'Log in',
    },
    [AuthType.Signup]: {
      wrongPlaceQuestion: 'Already have an account?',
      wrongPlaceLinkLabel: 'Log in',
      wrongPlaceLinkPath: '/login',
      errorToastTitle: 'Couldn’t sign up',
      title: 'Sign up',
    }
  };

  const strings = stringsDictionary[authType];

  useEffect(() => {
    if (errorMessage) {
      toast({
        status: 'error',
        isClosable: true,
        title: strings.errorToastTitle,
        description: errorMessage,
      });
    }
  }, [errorMessage]);

  return (
    <Center marginTop="8">
      <Box maxWidth="lg" minWidth="sm" p="8" borderRadius="lg" backgroundColor="gray.700" {...restProps}>
        <Heading as="h3" size="md" mb="4">{strings.title}</Heading>
        <Box mb="6">
          {strings.wrongPlaceQuestion} <Link href={strings.wrongPlaceLinkPath}>
            {strings.wrongPlaceLinkLabel}
          </Link>
        </Box>
        {children}
      </Box>
    </Center>
  );
}
