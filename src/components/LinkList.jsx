import * as React from "react";
import styled from "styled-components";
import { Divider } from "src/components/Divider";
import Link from "src/components/Link";
import Icon from "src/components/Icon";
import { rem, spacingRem, fontWeightBold } from "config/theme";
import { shape, string, arrayOf, func } from "prop-types";

const LinkListNav = styled.nav`
  display: grid;
  grid-template-rows: auto;
  row-gap: ${(props) => props.theme.spacing.xs};
  align-content: start;
`;

const LinkListIcon = styled(Icon)`
  font-size: 1.2em;
  margin-right: ${(props) => props.theme.spacing.xs};
`;

const LinkList = (props) => {
  const {
    currentPathname,
    links,
    linkComponent,
    renderInCurrentItem,
    className,
  } = props;
  const LinkComponent = linkComponent || Link;

  const renderItems = (items, level = 0) =>
    items.map((item) => {
      if (item.divider) {
        return <Divider />;
      }

      return (
        <React.Fragment key={item.url}>
          <LinkComponent
            href={item.url}
            style={{
              marginLeft: rem(spacingRem.sm * level),
              fontWeight: item.title ? fontWeightBold : undefined,
              display: "flex",
              alignItems: "center",
            }}
            active={item.active}
            activeClassName="active"
          >
            {item.icon && <LinkListIcon icon={item.icon} />}
            {item.label}
          </LinkComponent>
          {renderInCurrentItem &&
            currentPathname === item.url &&
            renderInCurrentItem(item)}
          {item.items && renderItems(item.items, level + 1)}
        </React.Fragment>
      );
    });

  return <LinkListNav className={className}>{renderItems(links)}</LinkListNav>;
};

LinkList.defaultProps = {
  currentPathname: undefined,
  renderInCurrentItem: undefined,
};

LinkList.propTypes = {
  currentPathname: string,
  links: arrayOf(
    shape({
      url: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
  renderInCurrentItem: func,
};

export default LinkList;
