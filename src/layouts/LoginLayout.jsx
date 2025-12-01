import React from "react";

const LoginLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      {children}
    </div>
  );
};

export default LoginLayout;
