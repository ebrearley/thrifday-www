import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styled from 'styled-components';
import useRegister from '../hooks/useRegister';
import { useRouter } from 'next/router';

interface SignupFormErrors {
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

const SignupForm = () => {
  const [register, { loading, error }] = useRegister();
  const router = useRouter();

  const onSubmit = (values, { setSubmitting }) => {
    register({
      email: values.email,
      password: values.password,
    }).then((registerArgs) => {
      setSubmitting(false);
      if (registerArgs?.data?.register?.user?.id) {
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
    <h1>Sign up</h1>
    {errorMessage}
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors: SignupFormErrors = {};
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
)};

export default SignupForm;
