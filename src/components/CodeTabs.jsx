import React, { Children, useState, isValidElement } from "react";
import styled from "styled-components";

const Tab = styled.button.attrs({ type: "button" })`
  appearance: none;
  color: ${(props) => (props.isActive ? props.theme.colors.primary : "white")};
  padding: ${(props) => props.theme.spacing.sm};
  line-height: 1;
  background-color: transparent;
  border: 0;
  border-bottom: 2px solid
    ${(props) => (props.isActive ? props.theme.colors.primary : "transparent")};
  margin-bottom: -2px;
`;

const Tabs = styled.div`
  display: flex;
  background-color: #3f3f3f;
  border-bottom: 2px solid #666;
  border-radius: 0.25em 0.25em 0 0;
`;

const CodeBlockWrapper = styled.div`
  code {
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
  }
`;

const CodeTabs = (props) => {
  const { children, tabs } = props;
  const [tabIndex, setTabIndex] = useState(0);

  const codeBlocks = Children.toArray(children)
    .filter(
      (child) =>
        isValidElement(child) &&
        typeof child.type === "function" &&
        child.type.name === "pre"
    )
    .map((codeBlock) => {
      const lang =
        codeBlock.props.children.props.className.match(/language-(\w+)/)?.[1] ??
        "txt";
      return [lang, codeBlock];
    });

  return (
    <div>
      <Tabs>
        {codeBlocks.map(([language], index) => (
          <Tab isActive={index === tabIndex} onClick={() => setTabIndex(index)}>
            {(tabs?.length && tabs[index]) ?? language}
          </Tab>
        ))}
      </Tabs>
      <CodeBlockWrapper>
        {codeBlocks
          .filter((unused, index) => index === tabIndex)
          .map(([, codeBlock]) => codeBlock)}
      </CodeBlockWrapper>
    </div>
  );
};

export default CodeTabs;
