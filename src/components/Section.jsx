import * as React from "react";
import { oneOf, bool, string, node, oneOfType, func } from "prop-types";
import styled from "styled-components";
import { breakpoints, rem, spacing } from "config/theme";
import Typography from "src/components/Typography";

export const containerPadding = spacing.sm;
export const containerWidth = {
  xs: "100%",
  sm: rem(breakpoints.sm - 16 * 2),
  md: rem(breakpoints.md - 16 * 2),
  lg: rem(breakpoints.lg - 16 * 2),
  xl: rem(breakpoints.xl - 16 * 2),
};

const Container = styled.div`
  padding: 0 ${containerPadding};
  margin: 0 auto;

  ${(props) =>
    props.theme.mediaBreakpointMap(
      Object.entries(containerWidth).reduce(
        (obj, [size, width]) => ({
          ...obj,
          [size]: `width: ${width};`,
        }),
        {}
      )
    )}
`;

const SectionRoot = styled.div`
  padding: ${(props) => props.theme.spacing[props.padding] || 0} 0;

  ${(props) => {
    const { background } = props;

    if (!background) {
      return "";
    }

    if (typeof background === "function") {
      return `background: ${background(props.theme)};`;
    }

    return `background: ${background};`;
  }}
`;

const SectionHeader = styled.div`
  ${(props) => props.centered && "text-align: center;"}
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const SectionTitle = styled(Typography)`
  margin: 0;
  margin-bottom: ${(props) =>
    props.showingSubtitle ? props.theme.spacing.md : "0"};
`;

const SectionSubtitle = styled.div`
  max-width: ${(props) => props.theme.rem(props.theme.breakpoints.lg)};
  margin-left: auto;
  margin-right: auto;
`;

const Section = (props) => {
  const {
    title,
    titleSize,
    subtitle,
    primary,
    padding,
    background,
    container,
    centeredHeader,
    className,
    children,
  } = props;

  const ContainerComponent = container ? Container : React.Fragment;

  return (
    <SectionRoot
      padding={padding}
      className={className}
      background={background}
    >
      <ContainerComponent>
        {(title || subtitle) && (
          <SectionHeader centered={centeredHeader}>
            {title && (
              <SectionTitle
                variant={primary ? "h1" : titleSize}
                showingSubtitle={!!subtitle}
              >
                {title}
              </SectionTitle>
            )}
            {subtitle && (
              <SectionSubtitle>
                {typeof subtitle === "function" ? subtitle() : subtitle}
              </SectionSubtitle>
            )}
          </SectionHeader>
        )}
        {children}
      </ContainerComponent>
    </SectionRoot>
  );
};

Section.defaultProps = {
  padding: undefined,
  title: undefined,
  titleSize: "h2",
  subtitle: undefined,
  primary: false,
  container: true,
  background: undefined,
};

Section.propTypes = {
  padding: oneOf(Object.keys(spacing)),
  title: oneOfType([string, node]),
  titleSize: oneOf(["h1", "h2", "h3", "h4", "h5"]),
  subtitle: oneOfType([func, node]),
  primary: bool,
  container: bool,
  background: oneOfType([func, string]),
};

export default Section;
