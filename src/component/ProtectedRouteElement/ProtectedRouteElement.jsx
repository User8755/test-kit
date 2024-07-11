import { Navigate } from 'react-router-dom';

// Защита роутов
const ProtectedRouteElement = ({ element: Component, ...props }) => {
  return props.login ? (
    <Component {...props} />
  ) : (
    <Navigate to='/sign-in' replace />
  );
};

export default ProtectedRouteElement;
