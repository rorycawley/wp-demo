import React, { memo } from 'react';

type ErrorMessage = {
  error: string;
};

const ErrorFound = memo(function ErrorFound({ error }: ErrorMessage) {
  return <div>{error}</div>;
});

export default ErrorFound;
