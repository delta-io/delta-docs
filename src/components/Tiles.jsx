import * as React from "react";
import styled from "styled-components";
import Link from "src/components/Link";
import Grid from "src/components/Grid";
import Embed from "src/components/Embed";
import { arrayOf, shape, string, bool, number } from "prop-types";

const Tile = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.$dark &&
    `
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  `}
`;

const TileImage = styled.img`
  width: 100%;
  height: auto;
  ${(props) => props.maxWidth && `max-width: ${props.maxWidth}px`}
`;

const TileLabel = styled.div`
  text-align: center;
  margin-top: ${(props) => props.theme.spacing.sm};
`;

const TileLink = styled(Tile).attrs({ as: Link, muted: true })`
  display: block;
  text-align: center;
  color: ${(props) => props.theme.light.color};

  &:hover {
    color: ${(props) => props.theme.light.color};
    text-decoration: underline;
  }
`;

const Tiles = (props) => {
  const {
    columns,
    tiles,
    maxImageWidth,
    showLabels,
    dark,
    evenRows,
    className,
  } = props;

  return (
    <Grid columns={columns} evenRows={evenRows} className={className}>
      {tiles.map((tile) => {
        const TileComponent = tile.url ? TileLink : Tile;

        return (
          <TileComponent key={tile.label} $dark={dark} href={tile.url}>
            <TileImage
              as={typeof tile.thumbnail === "string" ? "img" : Embed}
              src={tile.thumbnail}
              alt={showLabels ? "" : tile.label}
              maxWidth={maxImageWidth}
            />
            {showLabels && <TileLabel>{tile.label}</TileLabel>}
          </TileComponent>
        );
      })}
    </Grid>
  );
};

Tiles.defaultProps = {
  maxImageWidth: undefined,
  dark: false,
  showLabels: false,
  evenRows: false,
  className: undefined,
};

Tiles.propTypes = {
  columns: Grid.propTypes.columns.isRequired,
  tiles: arrayOf(
    shape({
      thumbnail: string.isRequired,
      label: string.isRequired,
      url: string,
    })
  ).isRequired,
  maxImageWidth: number,
  dark: bool,
  showLabels: bool,
  evenRows: bool,
  className: string,
};

export default Tiles;
