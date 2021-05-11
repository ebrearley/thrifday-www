import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import useRegister from '../hooks/useRegister';
import { useRouter } from 'next/router';

interface SignupFormErrors {
  email?: string;
  password?: string;
}

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
  <>
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
        <Form>
          <ErrorMessage name="email" component="div" />
          <Field type="email" name="email" placeholder="Email" />
          <ErrorMessage name="password" component="div" />
          <Field type="password" name="password" placeholder="Password" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </>
)};

export default SignupForm;
