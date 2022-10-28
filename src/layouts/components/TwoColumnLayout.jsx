import { string, shape, arrayOf, object } from "prop-types";
import * as React from "react";
import Section from "src/components/Section";
import Grid from "src/components/Grid";
import styled from "styled-components";
import Link from "src/components/Link";
import LinkList from "src/components/LinkList";
import TableOfContents from "./TableOfContents";

const menuSidebarWidthPx = 200;

const ColumnsGrid = styled(Grid)`
  position: relative;
  z-index: 1;
`;

const MainColumn = styled.div`
  max-width: 100%;
  overflow: hidden;
`;

const SidebarColumn = styled.div`
  display: none;
  border-right: 1px solid ${(props) => props.theme.colors.border};

  ${(props) =>
    props.theme.mediaBreakpointUp("lg")(`
    display: block;
  `)}
`;

const SidebarMenuLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: ${(props) => props.theme.fontWeightBold};

  &.active {
    color: ${(props) => props.theme.light.color};
  }

  &:hover {
    text-decoration: underline;
  }
`;

const InnerToc = styled(TableOfContents)`
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const TwoColumnLayout = (props) => {
  const { currentPathname, children, sidebarMenu, tocItems } = props;
  const hasSidebar = sidebarMenu || tocItems;

  return (
    <Section padding="xxl" background="white">
      <ColumnsGrid
        columns={
          hasSidebar
            ? {
                xs: 1,
                lg: [`${menuSidebarWidthPx}px`, "auto"],
              }
            : 1
        }
        gutter="xl"
      >
        {hasSidebar && (
          <SidebarColumn>
            {sidebarMenu ? (
              <LinkList
                links={sidebarMenu}
                linkComponent={SidebarMenuLink}
                currentPathname={currentPathname}
                renderInCurrentItem={() =>
                  tocItems ? <InnerToc items={tocItems} /> : null
                }
              />
            ) : (
              <TableOfContents
                currentPathname={currentPathname}
                items={tocItems}
                showTitle
              />
            )}
          </SidebarColumn>
        )}
        <MainColumn>
          <div>{children}</div>
        </MainColumn>
      </ColumnsGrid>
    </Section>
  );
};

TwoColumnLayout.defaultProps = {
  currentPathname: undefined,
  sidebarMenu: undefined,
  tocItems: undefined,
};

TwoColumnLayout.propTypes = {
  currentPathname: string,
  // eslint-disable-next-line react/forbid-prop-types
  sidebarMenu: arrayOf(object),
  tocItems: arrayOf(
    shape({
      title: string,
      url: string,
      // eslint-disable-next-line react/forbid-prop-types
      items: arrayOf(object),
    })
  ),
};

export default TwoColumnLayout;
