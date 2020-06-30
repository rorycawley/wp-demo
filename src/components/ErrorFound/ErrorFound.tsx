import React from 'react';

type ErrorMessage = {
  error: string;
};

const ErrorFound: React.FC<ErrorMessage> = ({ error }) => {
  return <div>{error}</div>;
};

export default ErrorFound;
