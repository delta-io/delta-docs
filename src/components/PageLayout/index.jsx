import * as React from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import * as theme from "config/theme";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";

const GlobalStyles = createGlobalStyle`
  html {
    -webkit-font-smoothing: antialiased;
    width: 100vw;
    overflow-x: hidden;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: ${(props) => props.theme.fontFamilyBase};
    font-size: 1rem;
    line-height: ${(props) => props.theme.lineHeightBase};
    margin: 0;
    background-color: ${(props) => props.theme.dark.bg};
    color: ${(props) => props.theme.dark.color};
  }

  input,
  select {
    font-family: ${(props) => props.theme.fontFamilyBase};
  }

  a {
    color: ${(props) => props.theme.colors.link};
  }

  a:hover {
    color: inherit;
  }

  code {
    font-family: ${(props) => props.theme.fontFamilyCode};
    font-size: ${(props) => props.theme.fontSizes.code};
  }

  h1, h2, h3, h4, h5, h6, b, strong {
    font-weight: ${(props) => props.theme.fontWeightBold};
  }

  .nav-link, .nav-link:focus, .nav-link:hover {
    color: ${(props) => props.theme.dark.color};
  }

  .dropdown-menu-dark {
    color: ${(props) => props.theme.dark.color};
    background-color: ${(props) => props.theme.dark.bg};
    border-color: rgba(0,0,0,.15);
  }
`;

const Content = styled.main`
  background-color: ${(props) => props.theme.light.bg};
  color: ${(props) => props.theme.light.color};
`;

const PageLayout = (props) => {
  const { children } = props;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <PageHeader />
      <Content>{children}</Content>
      <PageFooter />
    </ThemeProvider>
  );
};

export default PageLayout;
