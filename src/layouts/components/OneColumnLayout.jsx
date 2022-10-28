import * as React from "react";
import styled from "styled-components";
import Section from "src/components/Section";
import { oneOf } from "prop-types";

const ContentContainer = styled.div`
  ${(props) =>
    props.width !== "full" &&
    `
    max-width: 800px;
    margin: 0 auto;
  `}
`;

const OneColumnLayout = (props) => {
  const { width, children } = props;

  return (
    <Section padding="xxl" background="white">
      <ContentContainer width={width}>{children}</ContentContainer>
    </Section>
  );
};

OneColumnLayout.defaultProps = {
  width: undefined,
};

OneColumnLayout.propTypes = {
  width: oneOf(["full"]),
};

export default OneColumnLayout;
