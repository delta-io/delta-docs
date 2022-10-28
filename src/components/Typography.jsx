import { oneOf } from "prop-types";
import * as React from "react";
import styled from "styled-components";

const scaleSize = (amount, variant) => {
  if (variant === "dense") {
    return amount * 0.4;
  }

  if (variant === "relaxed") {
    return amount * 1.6;
  }

  return amount;
};

const blockStyles = (props) => `
  margin-top: 0;
  margin-bottom: ${scaleSize(1, props.density)}em;
`;

const headerStyles = (props) => `
  line-height: ${props.theme.lineHeightHeader};
  margin-top: ${scaleSize(1.5, props.density)}em;
  margin-bottom: ${scaleSize(0.5, props.density)}em;
`;

export const TypographyContainer = styled.div`
  > :first-child {
    margin-top: 0;
  }

  > :last-child {
    margin-bottom: 0;
  }
`;

const Paragraph = styled.p`
  ${(props) => blockStyles(props)}
  font-size: ${(props) => props.theme.fontSizes.primary};
`;

const Secondary = styled(Paragraph)`
  font-size: ${(props) => props.theme.fontSizes.secondary};
`;

const H1 = styled.h1`
  ${(props) => headerStyles(props)}
  font-size: ${(props) => props.theme.fontSizes.h1};
`;

const H2 = styled.h2`
  ${(props) => headerStyles(props)}
  font-size: ${(props) => props.theme.fontSizes.h2};
`;

const H3 = styled.h3`
  ${(props) => headerStyles(props)}
  font-size: ${(props) => props.theme.fontSizes.h3};
`;

const H4 = styled.h4`
  ${(props) => headerStyles(props)}
  font-size: ${(props) => props.theme.fontSizes.h4};
`;

const H5 = styled.h5`
  ${(props) => headerStyles(props)}
  font-size: ${(props) => props.theme.fontSizes.h5};
`;

const H6 = styled.h6`
  ${(props) => headerStyles(props)}
  font-size: ${(props) => props.theme.fontSizes.h6};
`;

const OrderedList = styled.ol`
  ${(props) => blockStyles(props)}
  font-size: ${(props) => props.theme.fontSizes.primary};
`;

const UnorderedList = styled.ul`
  ${(props) => blockStyles(props)}
  font-size: ${(props) => props.theme.fontSizes.primary};
`;

const ListItem = styled.li`
  ${(props) => blockStyles(props)}
`;

const HorizontalRule = styled.hr`
  margin: ${(props) => scaleSize(1.5, props.density)}em 0;
  border: none;
  height: 1px;
  background: ${(props) => props.theme.colors.border};
`;

const elements = {
  p: Paragraph,
  p2: Secondary,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  ol: OrderedList,
  ul: UnorderedList,
  li: ListItem,
  hr: HorizontalRule,
};

const Typography = (props) => {
  const { variant, children, ...rest } = props;

  const Element = elements[variant];

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Element {...rest}>{children}</Element>
  );
};

Typography.defaultProps = {
  variant: "p",
  density: undefined,
};

Typography.propTypes = {
  variant: oneOf(Object.keys(elements)),
  density: oneOf(["dense", "relaxed"]),
};

export default Typography;
