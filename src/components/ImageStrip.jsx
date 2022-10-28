import { arrayOf, object, oneOfType, shape, string } from "prop-types";
import * as React from "react";
import color from "color";
import Embed from "src/components/Embed";
import Link from "src/components/Link";
import Grid from "src/components/Grid";
import Typography from "src/components/Typography";
import styled from "styled-components";

const CardThumbnail = styled.div`
  background-color: ${(props) => color(props.theme.light.bg).darken(0.1)};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
`;

const ImageStrip = (props) => {
  const { items, className } = props;

  return (
    <Grid
      columns={{ xs: 1, sm: 2, lg: items.length }}
      gutter="xl"
      className={className}
    >
      {items.map((item) => (
        <Link key={item.url} href={item.url} muted>
          <CardThumbnail>
            <Embed src={item.thumbnail} alt="" aspectRatio={[16, 9]} />
          </CardThumbnail>
          {item.title && item.title !== "" && (
            <Typography variant="p2">{item.title}</Typography>
          )}
        </Link>
      ))}
    </Grid>
  );
};

ImageStrip.propTypes = {
  items: arrayOf(
    shape({
      title: string,
      thumbnail: oneOfType([string, object]).isRequired,
      url: string.isRequired,
    }).isRequired
  ).isRequired,
};

export default ImageStrip;
