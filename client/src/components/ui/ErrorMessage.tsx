import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
      <p>Error: {message}</p>
      <p>Please, reload page.</p>
    </div>
  );
};

export default ErrorMessage;