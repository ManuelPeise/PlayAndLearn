import React from "react";
import PageLayout from "../PageLayout";

const TestPage: React.FC = () => {
  return (
    <PageLayout
      pageTitle="DEV"
      pageBody={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        ></div>
      }
    />
  );
};

export default TestPage;
