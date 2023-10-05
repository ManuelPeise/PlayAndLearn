import React from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  component: JSX.Element;
  redirectUrl: string;
}

const PrivateRoute: React.FC<IProps> = (props) => {
  const { component, redirectUrl } = props;

  const [authenticated, setAuthenticated] = React.useState<boolean>(false);
  const [authenticationDialogOpen, setAuthenticationDialogOpen] =
    React.useState<boolean>(true);

  return authenticated ? component : <Navigate to={redirectUrl} />;
};

export default PrivateRoute;
