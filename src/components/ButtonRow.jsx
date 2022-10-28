import styled from "styled-components";
import Grid from "src/components/Grid";

const ButtonRow = styled(Grid)`
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

export default ButtonRow;
