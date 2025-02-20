import React from "react";
import { useTranslation } from "react-i18next";
import { Route } from "react-router-dom";
import styled from "styled-components";
import Box from "~/renderer/components/Box";
import Text from "~/renderer/components/Text";
import SwapForm from "./Form";
import SwapHistory from "./History";
import SwapNavbar from "./Navbar";
const Body = styled(Box)`
  flex: 1;
`;
const Main = styled.main`
  display: flex;
  justify-content: center;
  flex: 1;

  background-color: ${p => p.theme.colors.palette.background.paper};

  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  box-shadow: 0px 4px 6px rgba(20, 37, 51, 0.04);
  border-top: 1px solid ${p => p.theme.colors.palette.divider};

  & > * {
    width: 100%;
  }
`;
const Swap2 = () => {
  const { t } = useTranslation();
  return (
    <>
      <Text mb={20} ff="Inter|SemiBold" fontSize={7} color="palette.text.shade100">
        {t("swap2.title")}
      </Text>
      <Body>
        <SwapNavbar />
        <Main>
          <Route path="/swap" component={SwapForm} exact />
          <Route path="/swap/history" component={SwapHistory} exact />
        </Main>
      </Body>
    </>
  );
};
export default Swap2;
