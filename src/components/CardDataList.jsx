import * as React from "react";
import {
  arrayOf,
  oneOfType,
  oneOf,
  shape,
  string,
  number,
  objectOf,
  object,
  bool,
} from "prop-types";
import Link from "src/components/Link";
import styled from "styled-components";
import Grid from "src/components/Grid";
import Typography, { TypographyContainer } from "src/components/Typography";
import Embed from "src/components/Embed";

const applyFeaturedColumnStyles = ({ spanColumns, theme }, styles) => {
  if (spanColumns) {
    const columnsMap = Object.entries(spanColumns).reduce(
      (obj, [size, numColumns]) => ({
        ...obj,
        [size]: numColumns > 1 ? styles({ size, numColumns }) : undefined,
      }),
      {}
    );

    return theme.mediaBreakpointMap(columnsMap);
  }

  return "";
};

const Card = styled.div`
  ${(props) => {
    const { spanColumns, gutter, theme } = props;

    return applyFeaturedColumnStyles(
      { spanColumns, theme },
      ({ numColumns, size }) => `
        grid-column: span ${numColumns};
        margin-bottom: ${theme.spacing.xl};
        border: 1px solid ${theme.colors.border};
        padding: ${numColumns > 2 ? theme.spacing.xl : theme.spacing.lg};

        ${
          theme.breakpointGreaterThan("md")(size) &&
          `
          display: grid;
          grid-auto-flow: column;
          grid-gap: ${theme.spacing[gutter]};
          align-items: center;
          grid-auto-columns: ${numColumns > 2 ? "4fr 6fr" : "1fr 1fr"};
        `
        }
        
      `
    );
  }}
`;

const ThumbnailContainer = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.sm};

  a {
    margin-top: auto;
    display: block;
  }

  &:hover ~ ${TypographyContainer} a {
    text-decoration: underline;
  }

  ${(props) => {
    const { spanColumns, theme } = props;

    return applyFeaturedColumnStyles({ spanColumns, theme }, ({ size }) => {
      if (theme.breakpointGreaterThan("md")(size)) {
        return `
          min-height: 100%;
          margin-bottom: 0;
          display: flex;
          align-items: center;

          a {
          margin-top: 0;
          background-color: white;
          }
        `;
      }

      return `
        margin-bottom: ${theme.spacing.lg};
        max-width: 480px;
      `;
    });
  }}
`;

const ContentContainer = styled(TypographyContainer)`
  ${(props) => {
    const { spanColumns, theme } = props;

    return applyFeaturedColumnStyles(
      { spanColumns, theme },
      () => `
        display: flex;
        flex-flow: column;
        justify-content: center;
      `
    );
  }}
`;

const CardTitle = styled(Typography)`
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.spacing.xs};

  ${(props) => {
    const { spanColumns, theme } = props;
    const { fontSizes } = theme;

    return applyFeaturedColumnStyles(
      { spanColumns, theme },
      ({ size }) =>
        `
        display: flex;
        flex-flow: column;

        &::before {
          width: fit-content;
          content: 'Latest post';
          padding: .35em .5em;
          background-color: ${theme.colors.accent};
          font-size: 12px;
          font-weight: ${theme.fontWeightBold};
          z-index: 2;
          margin-bottom: ${theme.spacing.xs};
        }

        ${
          theme.breakpointGreaterThan("md")(size) &&
          `font-size: ${fontSizes.h3};`
        }
        `
    );
  }}
`;

const CardContent = styled(Typography)`
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.spacing.xs};
  ${(props) =>
    props.lineClamp &&
    `
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${props.lineClamp};
  overflow: hidden;
  `}
`;

const CardTag = styled.span`
  display: inline-block;
  margin-right: ${(props) => props.theme.spacing.md};
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const CardDataList = (props) => {
  const {
    columns,
    cards,
    density,
    thumbnailRatio,
    maxWidth,
    clampDescriptionLines,
    showFeatured,
  } = props;

  if (!cards.length) {
    return null;
  }

  let gutter = "lg";

  if (density === "dense") {
    gutter = "md";
  }

  if (density === "relaxed") {
    gutter = "xl";
  }

  return (
    <Grid columns={columns} gutter={gutter}>
      {cards.map((card, i) => {
        const isFeatured = showFeatured && i === 0;

        return (
          <Card
            key={card.title}
            spanColumns={isFeatured ? columns : undefined}
            gutter={gutter}
          >
            <ThumbnailContainer spanColumns={isFeatured ? columns : undefined}>
              <Link href={card.url}>
                <Embed
                  src={card.thumbnail}
                  aspectRatio={thumbnailRatio}
                  maxWidth={maxWidth}
                />
              </Link>
            </ThumbnailContainer>
            <ContentContainer spanColumns={isFeatured ? columns : undefined}>
              <CardTitle
                variant="h4"
                spanColumns={isFeatured ? columns : undefined}
              >
                <Link href={card.url} muted>
                  {card.title}
                </Link>
              </CardTitle>
              {card.meta && (
                <>
                  <CardContent variant="p2">{card.meta}</CardContent>
                  <Typography variant="hr" density="dense" />
                </>
              )}
              <CardContent variant="p2" lineClamp={clampDescriptionLines}>
                {card.docs && (
                  <Link href={card.docs} muted>
                    {" "}
                    docs{" "}
                  </Link>
                )}
                {card.docs && card.source_code && " | "}
                {card.source_code && (
                  <Link href={card.source_code} muted>
                    {" "}
                    source code{" "}
                  </Link>
                )}
                {card.docs && card.source_code && <br />}
                {card.tags?.length && (
                  <>
                    {card.tags.map((tag) => (
                      <CardTag key={tag}>{tag}</CardTag>
                    ))}
                    <br />
                  </>
                )}
                {card.description}
              </CardContent>
            </ContentContainer>
          </Card>
        );
      })}
    </Grid>
  );
};

CardDataList.defaultProps = {
  clampDescriptionLines: undefined,
  density: undefined,
  maxWidth: undefined,
  showFeatured: false,
};

CardDataList.propTypes = {
  columns: objectOf(number).isRequired,
  cards: arrayOf(
    shape({
      title: string.isRequired,
      url: string.isRequired,
      thumbnail: oneOfType([
        string,
        shape({
          // eslint-disable-next-line react/forbid-prop-types
          childImageSharp: object,
        }),
      ]).isRequired,
      description: string.isRequired,
      docs: string,
      source_code: string,
      meta: string,
      tags: arrayOf(string),
    })
  ).isRequired,
  clampDescriptionLines: number,
  density: oneOf(["dense", "relaxed"]),
  thumbnailRatio: arrayOf(number).isRequired,
  maxWidth: string,
  showFeatured: bool,
};

export default CardDataList;
