import { arrayOf, shape, string } from "prop-types";
import * as React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  th,
  td {
    min-width: 200px;
    padding: ${(props) => props.theme.spacing.xs};
    font-size: ${(props) => props.theme.fontSizes.primary};
  }
`;

const Table = (props) => {
  const { headers, data, className } = props;

  const columns = headers.map((header) => header.field);

  return (
    <StyledTable className={className}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.field}>{header.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.key}>
            {columns.map((column) => (
              <td key={column}>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

Table.propTypes = {
  headers: arrayOf(
    shape({
      label: string.isRequired,
      field: string.isRequired,
    })
  ).isRequired,
  data: arrayOf(
    shape({
      key: string.isRequired,
      // other fields can be added
    })
  ).isRequired,
  className: string,
};

Table.defaultProps = {
  className: undefined,
};

export default Table;
