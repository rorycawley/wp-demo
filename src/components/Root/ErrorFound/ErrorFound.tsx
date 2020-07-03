import React from 'react';

const defaultErrorMessage = 'An error has occurred.';

type ErrorMessage = {
  error?: string;
};

const ErrorFound: React.FC<{ error: string }> = ({
  error = defaultErrorMessage,
}) => {
  return <div>{error}</div>;
};

export default ErrorFound;
