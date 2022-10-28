import * as React from "react";
import color from "color";
import styled from "styled-components";
import Typography, { TypographyContainer } from "src/components/Typography";
import { colors } from "config/theme";
import { oneOf } from "prop-types";

const levelStyles = {
  info: {
    borderColor: colors.info,
    backgroundColor: color(colors.info).lighten(1.35),
    textColor: color(colors.info).darken(0.5),
  },
  warning: {
    borderColor: colors.warning,
    backgroundColor: color(colors.warning).lighten(0.5),
    textColor: color(colors.warning).darken(0.5),
  },
  danger: {
    borderColor: colors.danger,
    backgroundColor: color(colors.danger).lighten(0.9),
    textColor: color(colors.danger).darken(0.5),
  },
};

const BlockTitle = styled(Typography)`
  font-size: ${(props) => props.theme.fontSizes.secondary};
`;

const Block = styled.div`
  border: 1px solid ${(props) => levelStyles[props.level].borderColor};
  border-radius: 3px;
  background-color: ${(props) => levelStyles[props.level].backgroundColor};
  padding: ${(props) => props.theme.spacing.md};
  margin: ${(props) => props.theme.spacing.lg} 0;

  ${BlockTitle} {
    color: ${(props) => levelStyles[props.level].textColor};
  }
`;

const Info = (props) => {
  const { title, level, children } = props;

  return (
    <Block level={level}>
      <TypographyContainer>
        {title && <BlockTitle variant="h5">{title}</BlockTitle>}
        {children}
      </TypographyContainer>
    </Block>
  );
};

Info.defaultProps = {
  level: "info",
};

Info.propTypes = {
  level: oneOf(["info", "warning", "danger"]),
};

export default Info;
