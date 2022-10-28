import * as React from "react";
import styled from "styled-components";
import Section from "src/components/Section";
import Grid from "src/components/Grid";
import Typography from "src/components/Typography";
import { community, footer, learn, social } from "config/menus";
import Link from "src/components/Link";
import logo from "./delta-lake-logo.svg";
import theLinuxFoundationLogo from "./the-linux-foundation-logo.svg";

const menus = [
  {
    title: "Delta Lake",
    links: footer,
  },
  {
    title: "Learn",
    links: learn,
  },
  {
    title: "Community",
    links: community,
  },
  {
    title: "Social Channels",
    links: social,
  },
];

const Copyright = styled.div`
  ${(props) =>
    props.theme.mediaBreakpointUp("lg")(`
    width: 250px;
  `)}

  a {
    color: inherit;
  }

  a:hover {
    color: white;
  }
`;

const Footer = styled.footer`
  color: ${(props) => props.theme.dark.textSecondary};
`;

const FooterLogo = styled.img`
  display: none;

  ${(props) =>
    props.theme.mediaBreakpointUp("lg")(`
    display: block;
  `)}
`;

const FooterMenu = styled.nav`
  display: grid;
  grid-template-rows: auto;
  row-gap: ${(props) => props.theme.spacing.xs};
  align-content: start;
`;

const FooterMenuHeader = styled.div`
  text-transform: uppercase;
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const FooterMenuLink = styled(Link)`
  color: ${(props) => props.theme.dark.color};

  &:hover {
    color: white;
  }
`;

const PageFooter = () => (
  <Footer>
    <Section padding="xl">
      <Grid
        columns={{ xs: 1, lg: ["min-content", "auto", "min-content"] }}
        gutter={{ xs: "lg", lg: "xl" }}
      >
        <FooterLogo src={logo} alt="Delta Lake" width={160} height={34} />
        <Grid columns={{ xs: 1, md: 4 }}>
          {menus.map((menu) => (
            <FooterMenu key={menu.title}>
              <FooterMenuHeader>{menu.title}</FooterMenuHeader>
              {menu.links.map((link) => (
                <FooterMenuLink
                  key={link.url}
                  href={link.url}
                  newTab={/^http/.test(link.url)}
                  muted
                >
                  {link.label}
                </FooterMenuLink>
              ))}
            </FooterMenu>
          ))}
        </Grid>
        <Copyright>
          <Typography variant="p2">
            Copyright © {new Date().getFullYear()} Delta Lake, a series of LF
            Projects, LLC. For web site terms of use, trademark policy and other
            project polcies please see{" "}
            <Link href="https://lfprojects.org" newTab>
              https://lfprojects.org
            </Link>
            .
          </Typography>
          <img src={theLinuxFoundationLogo} alt="The Linux Foundation" />
        </Copyright>
      </Grid>
    </Section>
  </Footer>
);

export default PageFooter;
