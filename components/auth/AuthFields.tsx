import { Stack } from '@chakra-ui/react';
import { InputControl, SubmitButton } from 'formik-chakra-ui';

interface AuthFieldProps {
  isSubmitting: boolean;
  submitLabel: string;
}

export const AuthFields = ({ isSubmitting, submitLabel }: AuthFieldProps) => (
  <Stack spacing="8">
    <InputControl inputProps={{ type: 'email',  placeholder: 'john.smith@email.com' }} name="email" label="Email address" />
    <InputControl inputProps={{ type: 'password',  placeholder: 'Password' }} name="password" label="Password" />
    <SubmitButton disabled={isSubmitting}>
      {submitLabel}
    </SubmitButton>
  </Stack>
);
