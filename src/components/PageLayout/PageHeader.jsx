import * as React from "react";
import Link from "src/components/Link";
import * as menus from "config/menus";
import { mediaBreakpointUp, mediaBreakpointDown } from "config/theme";
import styled from "styled-components";
import Section from "src/components/Section";
import Icon from "src/components/Icon";
import logo from "./delta-lake-logo.svg";
import PageHeaderSearchInput from "./PageHeaderSearchInput";
import HeaderNavItem, { HeaderTab } from "./HeaderNavItem";

const { useState } = React;

const showingMobileMenu = mediaBreakpointDown("lg");
const hidingMobileMenu = mediaBreakpointUp("lg");

const Header = styled(Section)`
  background-color: ${(props) => props.theme.dark.bg};
  color: ${(props) => props.theme.dark.light};
  min-height: 48px;
  display: flex;
  align-items: center;
`;

const HeaderLogo = styled(Link)`
  line-height: 0;

  ${showingMobileMenu(`
    display: block;
    margin-left: auto;
    margin-right: auto;
  `)}
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const HeaderBackdrop = styled.button`
  ${(props) =>
    showingMobileMenu(`
    background-color: rgba(0, 0, 0, 0.5);
    border: 0;
    appearance: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 998;
    display: ${props.showing ? "block" : "none"};
    cursor: pointer;
  `)}

  ${hidingMobileMenu(`
    display: none;
  `)}
`;

const HeaderMenu = styled.div`
  ${(props) =>
    showingMobileMenu(`
    position: fixed;
    top: 0;
    right: 0;
    transform: ${props.showing ? "translateX(0)" : "translateX(100%)"};
    bottom: 0;
    background-color: white;
    color: ${props.theme.light.color};
    z-index: 999;
  `)}

  ${hidingMobileMenu(`
    display: flex;
    flex: 1 1 auto;
  `)}
`;

const HeaderNav = styled.div`
  display: flex;
  flex: 0 0 auto;
  padding: 0 ${(props) => props.theme.spacing.md};

  ${(props) =>
    showingMobileMenu(`
    min-width: 200px;
    flex-flow: column;
    padding: 0 ${props.theme.spacing.sm};
  `)}
`;

const HeaderSocialNav = styled(HeaderNav)`
  margin-left: auto;
  padding-right: 0;

  ${showingMobileMenu(`
    margin-left: 0;
    flex-flow: row;
  `)}
`;

const HeaderIcon = styled(Icon)`
  font-size: ${(props) => props.theme.rem(26)};
`;

const HeaderToggle = styled(HeaderTab)`
  border: 0;
  background-color: transparent;
  appearance: none;
  position: absolute;
  cursor: pointer;

  ${hidingMobileMenu(`
    display: none;
  `)}
`;

const HeaderMenuToggle = styled(HeaderToggle)`
  right: 0;
`;

const HeaderSearchToggle = styled(HeaderToggle)`
  left: 0;
`;

const HeaderSearch = styled.div`
  ${(props) =>
    showingMobileMenu(`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 75%;
    min-width: 300px;
    transform: ${props.showing ? "translateX(0)" : "translateX(-100%)"};
    background-color: white;
    color: ${props.theme.light.color};
    z-index: 999;
    padding: ${props.theme.spacing.md}
  `)}

  ${hidingMobileMenu(`
    display: none;
  `)}
`;

const DesktopHeaderSearchInput = styled(PageHeaderSearchInput)`
  display: none;

  ${(props) =>
    hidingMobileMenu(`
    display: block;
    flex: 1 1 auto;
    min-height: 48px;
    padding: ${props.theme.spacing.xs} 0;
  `)}
`;

const PageHeader = () => {
  const [menuShowing, setMenuShowing] = useState(false);
  const [searchShowing, setSearchShowing] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  return (
    <Header>
      <HeaderContainer>
        <HeaderSearchToggle as="button" onClick={() => setSearchShowing(true)}>
          <HeaderIcon icon="search" />
        </HeaderSearchToggle>
        <HeaderLogo href="/">
          <img src={logo} alt="Delta Lake" width="133" height="28" />
        </HeaderLogo>
        <HeaderMenuToggle as="button" onClick={() => setMenuShowing(true)}>
          <HeaderIcon icon="menu" />
        </HeaderMenuToggle>
        <HeaderMenu showing={menuShowing}>
          <HeaderNav>
            {menus.main.map((link) => (
              <HeaderNavItem items={link} key={link.url} />
            ))}
          </HeaderNav>
          <DesktopHeaderSearchInput
            input={searchInput}
            onChange={setSearchInput}
            floatingResults
            dark
          />
          <HeaderSocialNav>
            {menus.social.map((link) => {
              const { label, url, icon } = link;

              return (
                <HeaderTab key={label} href={url} newTab>
                  <HeaderIcon icon={icon} />{" "}
                </HeaderTab>
              );
            })}
          </HeaderSocialNav>
        </HeaderMenu>
        <HeaderSearch showing={searchShowing}>
          <PageHeaderSearchInput
            input={searchInput}
            onChange={setSearchInput}
          />
        </HeaderSearch>
        <HeaderBackdrop
          onClick={() => {
            setMenuShowing(false);
            setSearchShowing(false);
          }}
          showing={menuShowing || searchShowing}
        />
      </HeaderContainer>
    </Header>
  );
};

export default PageHeader;
