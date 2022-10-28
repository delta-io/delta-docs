import color from "color";
import * as React from "react";
import styled from "styled-components";
import Icon from "src/components/Icon";

const iconSizePx = 26;

const InputContainer = styled.div`
  position: relative;
`;

const InputIcon = styled(Icon)`
  color: ${(props) =>
    props.dark ? props.theme.dark.color : props.theme.light.color};
  font-size: ${iconSizePx}px;
  position: absolute;
  top: 50%;
  left: ${(props) => props.theme.spacing.xs};
  margin-top: -${iconSizePx / 2}px;
`;

const Input = styled.input`
  font-size: ${(props) => props.theme.fontSizes.secondary};
  width: 100%;
  border: 1px solid
    ${(props) =>
      props.dark ? props.theme.dark.border : props.theme.colors.border};
  line-height: 1;
  padding: ${(props) => {
    if (props.hasIcon) {
      return `${props.theme.spacing.xs}
      ${props.theme.spacing.sm} ${props.theme.spacing.xs}
      calc(
        ${props.theme.spacing.xs} + ${iconSizePx}px +
          ${props.theme.spacing.xs}
      );`;
    }

    return `${props.theme.spacing.xs} ${props.theme.spacing.sm};`;
  }}
  background-color: ${(props) =>
    props.dark ? props.theme.dark.border : "white"};
  color: ${(props) =>
    props.dark ? props.theme.dark.color : props.theme.light.color};

  &::placeholder {
    color: ${(props) =>
      props.dark
        ? color(props.theme.colors.textSecondary).lighten(1)
        : props.theme.colors.textSecondary};
  }

  &:focus {
    outline: 0;
    background-color: ${(props) =>
      props.dark ? "rgba(255, 255, 255, .15)" : "white"};
    border-color: ${(props) =>
      props.dark ? "transparent" : props.theme.colors.primary};
  }
`;

export const InputField = (props) => {
  const { type, value, onChange, placeholder, id, icon, dark } = props;

  return (
    <InputContainer>
      {icon && <InputIcon icon={icon} dark={dark} />}
      <Input
        type={type}
        value={value}
        onChange={onChange}
        id={id}
        hasIcon={!!icon}
        placeholder={placeholder}
        dark={dark}
      />
    </InputContainer>
  );
};
