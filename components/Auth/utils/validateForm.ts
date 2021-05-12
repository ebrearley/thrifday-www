import { AuthFormValues } from '../@types/AuthFormValues';


export const validateForm = (values: AuthFormValues) => {
  const errors: AuthFormValues = {};

  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password required';
  }

  return errors;
}
