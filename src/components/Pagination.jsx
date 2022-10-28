import * as React from "react";
import { bool, number, string } from "prop-types";
import Grid from "src/components/Grid";
import Button from "src/components/Button";
import styled from "styled-components";

const ButtonRow = styled(Grid)`
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing.xxl};
`;

const Pagination = (props) => {
  const { hasPreviousPage, hasNextPage, currentPage, basePath } = props;

  if (!hasPreviousPage && !hasNextPage) {
    return null;
  }

  const buttons = hasNextPage && hasPreviousPage ? 2 : 1;

  return (
    <ButtonRow columns={Array(buttons).fill("min-content")} gutter="lg">
      {hasPreviousPage && (
        <Button
          href={`${basePath}${
            currentPage - 1 < 2 ? "" : `/${currentPage - 1}`
          }`}
          variant="secondary"
        >
          Previous page
        </Button>
      )}
      {hasNextPage && (
        <Button href={`${basePath}/${currentPage + 1}`}>Next page</Button>
      )}
    </ButtonRow>
  );
};

Pagination.propTypes = {
  hasPreviousPage: bool.isRequired,
  hasNextPage: bool.isRequired,
  currentPage: number.isRequired,
  basePath: string.isRequired,
};

export default Pagination;
