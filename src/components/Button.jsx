import styled from "styled-components";
import Link from "src/components/Link";
import color from "color";
import { bool, oneOf } from "prop-types";

const getButtonColors = (props) => {
  const { variant, theme, buttonColors } = props;

  if (buttonColors) {
    return buttonColors;
  }

  if (variant === "secondary") {
    return {
      text: theme.colors.primary,
      background: "transparent",
      border: theme.colors.primary,
      textHover: "white",
      backgroundHover: theme.colors.primary,
      borderHover: theme.colors.primary,
    };
  }

  if (variant === "accent") {
    return {
      text: theme.colors.text,
      background: theme.colors.accent,
      border: theme.colors.accent,
      textHover: theme.colors.text,
      backgroundHover: theme.colors.accent,
      borderHover: theme.colors.accent,
    };
  }

  return {
    text: "white",
    background: theme.colors.primary,
    border: theme.colors.primary,
    textHover: "white",
    backgroundHover: theme.colors.primary,
    borderHover: theme.colors.primary,
  };
};

const Button = styled(Link)`
  display: inline-block;
  padding: ${(props) => {
    if (props.size === "small") {
      return `${props.theme.spacing.xs} ${props.theme.spacing.sm}`;
    }

    return `${props.theme.spacing.sm} ${props.theme.spacing.lg}`;
  }};
  line-height: 1;
  background-color: ${(props) =>
    props.borderStyle === "outlined"
      ? getButtonColors(props).text
      : getButtonColors(props).background};
  color: ${(props) =>
    props.borderStyle === "outlined"
      ? getButtonColors(props).border
      : getButtonColors(props).text};
  border-radius: 3px;
  text-decoration: none;
  font-weight: ${(props) => props.theme.fontWeightBold};
  font-size: ${(props) => {
    if (props.size === "small") {
      return props.theme.fontSizes.small;
    }

    return props.theme.fontSizes.primary;
  }};
  white-space: nowrap;
  border: 1px solid ${(props) => getButtonColors(props).border};

  &:hover {
    background-color: ${(props) =>
      color(getButtonColors(props).backgroundHover).lighten(0.1)};
    border-color: ${(props) =>
      color(getButtonColors(props).borderHover).lighten(0.1)};
    color: ${(props) => getButtonColors(props).textHover};
  }
`;

Button.propTypes = {
  secondary: bool,
  size: oneOf(["small", "medium"]),
  borderStyle: oneOf(["outlined", "normal"]),
};

export default Button;
