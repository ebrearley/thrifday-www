import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styled from 'styled-components';
import useLogin from '../hooks/useLogin';
import { useRouter } from 'next/router';

interface LoginFormErrors {
  email?: string;
  password?: string;
}

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & input {
    margin-bottom: 1rem;
  }
`;

const LoginForm = () => {
  const [login, { loading, error }] = useLogin();
  const router = useRouter();

  const onSubmit = (values, { setSubmitting }) => {
    login({
      email: values.email,
      password: values.password,
    }).then((mutationArgs) => {
      setSubmitting(false);
      if (mutationArgs?.data?.login?.user?.id) {
        router.push('/');
      }
    });
  }

  let errorMessage = null;
  if (error) {
    errorMessage = <div>{error.message}</div>
  }

  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors: LoginFormErrors = {};
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
          <StyledForm>
            <ErrorMessage name="email" component="div" />
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="password" component="div" />
            <Field type="password" name="password" placeholder="Password" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </StyledForm>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
