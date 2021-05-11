import { Stack, FormErrorMessage } from '@chakra-ui/react';
import { ErrorMessage } from 'formik';
import { InputControl, SubmitButton } from 'formik-chakra-ui';

interface WrapperProps {
  isSubmitting: boolean;
  submitLabel: string;
}

export default function AuthFields(props: WrapperProps) {
  const { isSubmitting, submitLabel } = props;

  return (
    <Stack spacing="8">
      <InputControl inputProps={{ type: 'email',  placeholder: 'john.smith@email.com' }} name="email" label="Email address" />
      <InputControl inputProps={{ type: 'password',  placeholder: 'Password' }} name="password" label="Password" />
      <SubmitButton disabled={isSubmitting}>
        {submitLabel}
      </SubmitButton>
    </Stack>
  );
}
