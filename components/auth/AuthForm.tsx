import { Formik, Form } from 'formik';
import { get } from 'lodash';
import React from 'react';

import { AuthType } from './@enums/AuthType';
import { useRouter } from 'next/router';
import { AuthContainer } from './AuthContainer';
import { AuthFields } from './AuthFields';
import { useLogin } from '../../hooks/useLogin';
import { useRegister } from '../../hooks/useRegister';
import { useToast } from '@chakra-ui/react';
import { AuthFormValuesOrErrors } from './@types/AuthFormValuesOrErrors';
import { validateForm } from './utils/validateForm';


interface AuthFormProps {
  authType: AuthType;
}

export const AuthForm = (props: AuthFormProps) => {
  const [login, { error: loginError }] = useLogin();
  const [register, { error: registerError }] = useRegister();
  const { authType } = props;

  const router = useRouter();
  const toast = useToast();

  const authDictionary = {
    [AuthType.Login]: {
      mutation: login,
      error: loginError,
      userIdPath: 'data.login.user.id',
      submitLable: 'Log in',
      successToastText: 'Logged in!',
    },
    [AuthType.Signup]: {
      mutation: register,
      error: registerError,
      userIdPath: 'data.register.user.id',
      submitLable: 'Sign up',
      successToastText: 'Account registered and now logged in!',
    },
  };

  const auth = authDictionary[authType];

  const onSubmit = (values: AuthFormValuesOrErrors, { setSubmitting }) => {
    auth.mutation({
      email: values.email,
      password: values.password,
    },
    ).then((mutationArgs) => {
      setSubmitting(false);

      const userId = get(mutationArgs, auth.userIdPath);
      if (userId) {
        toast({
          isClosable: true,
          status: 'success',
          duration: 1000,
          title: auth.successToastText,
        })
        router.push('/');
      }
    });
  }

  return (
    <AuthContainer authType={authType} errorMessage={auth.error?.message}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={validateForm}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <AuthFields isSubmitting={isSubmitting} submitLabel={auth.submitLable} />
          </Form>
        )}
      </Formik>
    </AuthContainer>
  );
};

