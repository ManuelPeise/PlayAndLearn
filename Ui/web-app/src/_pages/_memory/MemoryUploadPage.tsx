import React from "react";
import PageLayout from "../PageLayout";
import { Container } from "@mui/material";
import MemorySettingsContainer from "./_components/MemorySettingsContainer";
import Loadingindicator from "src/_components/_loading/LoadingIndicator";
import { useTranslation } from "react-i18next";
import MemoryUploadProvider, {
  MemoryUploadContext,
} from "./MemoryUploadContext";

const MemoryUploadPage: React.FC = () => {
  const { t } = useTranslation();
  const { isLoading } = React.useContext(MemoryUploadContext);
  const pageTitle = React.useMemo(() => {
    return t(`memory:titleMemoryUploadPageName`);
  }, [t]);

  return (
    <PageLayout
      pageTitle={pageTitle ?? ""}
      pageBody={
        <MemoryUploadProvider>
          <Loadingindicator isLoading={isLoading ?? false} />
          <Container
            fixed={true}
            style={{
              marginTop: "16px",
              padding: "16px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <MemorySettingsContainer />
          </Container>
        </MemoryUploadProvider>
      }
    />
  );
};

export default MemoryUploadPage;
