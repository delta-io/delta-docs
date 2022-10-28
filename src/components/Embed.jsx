import { arrayOf, number, string, any } from "prop-types";
import * as React from "react";
import styled from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const embedStyles = `
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const EmbedContainer = styled.div`
  position: relative;
  ${(props) =>
    !props.src?.childImageSharp &&
    props.aspectRatio &&
    `padding-top: ${(props.aspectRatio[1] / props.aspectRatio[0]) * 100}%;`}
`;

const EmbedImage = styled.img`
  ${embedStyles}
`;

const OtherEmbed = styled.div`
  ${embedStyles}
`;

const determineEmbedComponent = (src, alt) => {
  if (/\.(jpe?g|gif|png)/.test(src)) {
    return <EmbedImage src={src} alt={alt} />;
  }

  return <OtherEmbed>{src}</OtherEmbed>;
};

const Embed = (props) => {
  const { alt, aspectRatio, src, maxWidth, className } = props;

  if (src?.childImageSharp) {
    return (
      <div className={className}>
        <GatsbyImage image={getImage(src)} alt={alt ?? ""} />
      </div>
    );
  }

  const embeddedComponent = determineEmbedComponent(src, alt);

  return (
    <div className={className} style={{ maxWidth }}>
      <EmbedContainer aspectRatio={aspectRatio}>
        {embeddedComponent}
      </EmbedContainer>
    </div>
  );
};

Embed.defaultProps = {
  alt: undefined,
  maxWidth: "none",
};

Embed.propTypes = {
  alt: string,
  aspectRatio: arrayOf(number.isRequired).isRequired,
  // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
  src: any,
  maxWidth: string,
};

export default Embed;
