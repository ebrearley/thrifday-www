import { Formik, Form } from 'formik';
import { get } from 'lodash';
import React from 'react';

import { AuthType } from './@enums/AuthType';
import { useRouter } from 'next/router';
import { AuthContainer } from './AuthContainer';
import { AuthFields } from './AuthFields';
import { useLogin } from '../../hooks/useLogin';
import { useRegister } from '../../hooks/useRegister';

interface AuthFormErrors {
  email?: string;
  password?: string;
}

interface AuthFormProps {
  authType: AuthType;
}

export const AuthForm = (props: AuthFormProps) => {
  const [login, { error: loginError }] = useLogin();
  const [register, { error: registerError }] = useRegister();
  const { authType } = props;

  const router = useRouter();

  const authDictionary = {
    [AuthType.Login]: {
      mutation: login,
      error: loginError,
      userIdPath: 'data.login.user.id',
      submitLable: 'Log in',
    },
    [AuthType.Signup]: {
      mutation: register,
      error: registerError,
      userIdPath: 'data.register.user.id',
      submitLable: 'Sign up',
    },
  };

  const auth = authDictionary[authType];

  const onSubmit = (values, { setSubmitting }) => {
    auth.mutation({
      email: values.email,
      password: values.password,
    },
    ).then((mutationArgs) => {
      setSubmitting(false);

      const userId = get(mutationArgs, auth.userIdPath);
      if (userId) {
        router.push('/');
      }
    });
  }

  return (
    <AuthContainer authType={authType} errorMessage={auth.error?.message}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors: AuthFormErrors = {};
          if (!values.email) {
            errors.email = 'Email required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }

          if (!values.password) {
            errors.password = 'Password required';
          }
          return errors;
        }}
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

