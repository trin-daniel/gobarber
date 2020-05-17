import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}
export default function getValidatorErrors(err: ValidationError) {
  const validation: Errors = {};
  err.inner.forEach((error) => {
    validation[error.path] = error.message;
  });
  return validation;
}
