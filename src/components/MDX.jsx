/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import Link from "src/components/Link";
import { MDXProvider } from "@mdx-js/react";
import styled from "styled-components";
import Typography from "src/components/Typography";
import CodeBlock from "src/components/CodeBlock";
import Info from "src/components/Info";
import ImageStrip from "src/components/ImageStrip";
import CodeTabs from "src/components/CodeTabs";

const MarkdownContent = styled.div`
  .align-image-left .gatsby-resp-image-wrapper {
    margin-left: 0 !important;
  }
  ,
  .github-md-table-format {
    table,
    th,
    td {
      border: 1px solid #ddd;
    }
    table {
      border-collapse: collapse;
    }
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    th,
    td {
      padding: 10px;
    }
  }
`;

const Image = styled.img`
  max-width: 100%;
`;

const mdxComponents = {
  p: (props) => <Typography variant="p" {...props} />,
  h1: (props) => <Typography variant="h1" {...props} />,
  h2: (props) => <Typography variant="h2" anchor {...props} />,
  h3: (props) => <Typography variant="h3"  anchor {...props} />,
  h4: (props) => <Typography variant="h4" anchor {...props} />,
  h5: (props) => <Typography variant="h5" anchor {...props} />,
  h6: (props) => <Typography variant="h6" anchor {...props} />,
  ol: (props) => <Typography variant="ol" {...props} />,
  ul: (props) => <Typography variant="ul" {...props} />,
  a: Link,
  li: (props) => <Typography variant="li" {...props} />,
  hr: (props) => <Typography variant="hr" {...props} />,
  thematicBreak: (props) => <Typography variant="hr" {...props} />,
  img: (props) => <Image {...props} />,
  pre: (props) => <CodeBlock {...props} />,

  // Custom components
  Info,
  ImageStrip,
  CodeTabs,
};

const MDX = (props) => {
  const { children } = props;

  return (
    <MDXProvider components={mdxComponents}>
      <MarkdownContent>{children}</MarkdownContent>
    </MDXProvider>
  );
};

export default MDX;
