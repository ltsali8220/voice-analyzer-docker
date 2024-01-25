import React from 'react';

const ErrorComponent: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="alert alert-danger" role="alert">
      {children}
    </div>
  );
};

export default ErrorComponent;