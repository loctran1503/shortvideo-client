

import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../store/hooks';
import { dataSelector } from '../store/reducers/dataSlice';

interface ProtectedProps {
  component: () => JSX.Element;
}

const PrivateRoute = ({ component: Component, ...rest }: ProtectedProps) => {
  const { isAdmin } = useAppSelector(dataSelector);

  return isAdmin ? <Component {...rest} /> : <Navigate to="/" />;
};

export default PrivateRoute;