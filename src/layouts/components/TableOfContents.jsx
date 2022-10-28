import * as React from "react";
import Link from "src/components/Link";
import LinkList from "src/components/LinkList";
import Typography from "src/components/Typography";
import styled from "styled-components";

const TableOfContentsLinkTitle = styled(Typography)`
  text-transform: uppercase;
  font-weight: ${(props) => props.theme.fontWeightBold};
  color: ${(props) => props.theme.light.color};
`;

const TableOfContentsLink = styled(Link)`
  ${(props) =>
    props.active ? `font-weight: ${props.theme.fontWeightBold};` : ""}
  text-decoration: none;
  color: ${(props) => props.theme.light.color};

  &:hover {
    text-decoration: underline;
  }
`;

const mapTocItems = (items) =>
  items.map((item) => ({
    ...item,
    label: item.title,
    items: item.items ? mapTocItems(item.items) : undefined,
  }));

const TableOfContents = (props) => {
  const { currentPathname, items, className, showTitle } = props;

  return (
    <div className={className}>
      {showTitle && (
        <TableOfContentsLinkTitle variant="p2">
          On this page
        </TableOfContentsLinkTitle>
      )}
      <LinkList
        currentPathname={currentPathname}
        links={mapTocItems(items)}
        linkComponent={TableOfContentsLink}
      />
    </div>
  );
};

export default TableOfContents;
