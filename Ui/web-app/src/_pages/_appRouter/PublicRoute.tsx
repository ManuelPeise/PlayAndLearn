import React from "react";

interface IProps {
  component: JSX.Element;
}

const PublicRoute: React.FC<IProps> = (props) => {
  const { component } = props;

  return component;
};

export default PublicRoute;
