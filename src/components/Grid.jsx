import * as React from "react";
import styled from "styled-components";
import {
  arrayOf,
  number,
  string,
  oneOf,
  oneOfType,
  shape,
  bool,
} from "prop-types";
import { breakpoints, spacing } from "config/theme";

const columnsRule = (columns) => {
  if (typeof columns === "number") {
    return `grid-template-columns: ${Array(columns).fill("1fr").join(" ")};`;
  }

  return `grid-template-columns: ${columns
    .reduce(
      (columnSizes, columnSize) => [
        ...columnSizes,
        typeof columnSize === "number" ? `${columnSize}fr` : columnSize,
      ],
      []
    )
    .join(" ")};`;
};

const gutterRule = (gutter) => `
  column-gap: ${spacing[gutter]};
  row-gap: ${spacing[gutter]};
`;

const GridContainer = styled.div`
  display: grid;
  ${(props) => props.evenRows && "grid-auto-rows: 1fr;"}

  ${(props) => {
    const { theme, columns, gutter } = props;

    const columnsMap = Object.entries(columns).reduce(
      (obj, [size, numColumns]) => ({
        ...obj,
        [size]: columnsRule(numColumns),
      }),
      {}
    );

    const gutterMap = Object.entries(gutter).reduce(
      (obj, [size, gutterSize]) => ({
        ...obj,
        [size]: gutterRule(gutterSize),
      }),
      {}
    );

    return theme.mediaBreakpointMaps([columnsMap, gutterMap]);
  }}
`;

const Grid = (props) => {
  const { evenRows, columns, gutter, className, children } = props;

  return (
    <GridContainer
      evenRows={evenRows}
      columns={
        typeof columns === "string" ||
        typeof columns === "number" ||
        Array.isArray(columns)
          ? { xs: columns }
          : columns
      }
      gutter={typeof gutter === "string" ? { xs: gutter } : gutter}
      className={className}
    >
      {children}
    </GridContainer>
  );
};

Grid.defaultProps = {
  columns: 1,
  gutter: "md",
  evenRows: false,
};

const columnSizeType = oneOfType([
  oneOfType([number, string]),
  arrayOf(oneOfType([number, string])),
]);
const gutterSizeType = oneOf(Object.keys(spacing));

const responsiveGutterType = Object.keys(spacing).reduce(
  (sizes, size) => ({
    ...sizes,
    [size]: gutterSizeType,
  }),
  {}
);

const responsiveColumnsType = Object.keys(breakpoints).reduce(
  (sizes, size) => ({
    ...sizes,
    [size]: columnSizeType,
  }),
  {}
);

Grid.propTypes = {
  evenRows: bool,
  columns: oneOfType([columnSizeType, shape(responsiveColumnsType)]),
  gutter: oneOfType([gutterSizeType, shape(responsiveGutterType)]),
};

export default Grid;
