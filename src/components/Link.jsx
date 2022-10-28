/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-has-content */
import * as React from "react";
import { Link as GatsbyLink } from "gatsby";
import { OutboundLink } from "gatsby-plugin-google-gtag";
import styled from "styled-components";

const externalLinkRegex = /^\w+:\/\//;
const anchorLinkRegex = /^#/;

const StyledLink = styled.a`
  ${(props) =>
    props.muted === true &&
    `
    color: inherit;
    text-decoration: none;
  `}
`;

const Link = (props) => {
  const {
    href,
    activeClassName,
    partiallyActive,
    active,
    muted,
    target,
    newTab,
    rel,
    ...rest
  } = props;
  const isExternal = externalLinkRegex.test(href);
  const isAnchor = anchorLinkRegex.test(href);
  const linkTarget = target || newTab ? "_blank" : undefined;
  const linkRel = rel || linkTarget === "_blank" ? "noreferrer" : undefined;

  if (isAnchor) {
    return (
      <StyledLink
        muted={muted}
        href={href}
        target={linkTarget}
        rel={linkRel}
        {...rest}
      />
    );
  }

  if (isExternal) {
    return (
      <StyledLink
        as={OutboundLink}
        muted={muted}
        href={href}
        target={linkTarget}
        rel={linkRel}
        {...rest}
      />
    );
  }

  return (
    <StyledLink
      as={GatsbyLink}
      muted={muted}
      to={href}
      activeClassName={activeClassName}
      partiallyActive={partiallyActive}
      target={linkTarget}
      rel={linkRel}
      {...rest}
    />
  );
};

export default Link;
