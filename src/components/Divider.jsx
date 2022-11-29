import styled from "styled-components";

export const Divider = styled.hr`
  border-color: ${(props) => props.theme.colors.border};
  opacity: 1; // TODO: "common" styles
`;
