import { string, func, bool } from "prop-types";
import * as React from "react";
import styled from "styled-components";
import { InputField } from "src/components/Form";
import { graphql, useStaticQuery } from "gatsby";
import { useFlexSearch } from "react-use-flexsearch";
import Link from "src/components/Link";
import Icon from "../Icon";

const PageHeaderSearchInputRoot = styled.div`
  position: relative;
  z-index: 99;
`;

const PageHeaderSearchInputRootCloseOutside = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 98;
`;

const SearchInput = styled(InputField)`
  border-radius: 3px;
`;

const SearchResultsList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  color: ${(props) => props.theme.light.color};
  overflow: auto;
  ${(props) =>
    props.floating
      ? `
      box-shadow: 0 2px 4px rgba(0, 0, 0, .15);
      max-height: 450px;
      z-index: 999;
      `
      : `
      margin: 0 -${props.theme.spacing.md};
      `}
`;

const NoResults = styled.div`
  padding: ${(props) => props.theme.spacing.md};
  font-size: ${(props) => props.theme.fontSizes.secondary};
`;

const SearchResult = styled(Link)`
  display: block;
  padding: ${(props) => props.theme.spacing.md};
  text-decoration: none;
  background-color: white;
  color: inherit;
  font-size: ${(props) => props.theme.rem(12)};

  strong {
    display: block;
    font-size: ${(props) => props.theme.fontSizes.secondary};
  }

  em {
    font-style: normal;
    font-weight: normal;
    color: ${(props) => props.theme.colors.textSecondary};
  }

  span {
    display: block;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  &:hover {
    background-color: ${(props) => props.theme.light.bg};

    strong {
      text-decoration: underline;
    }
  }
`;

const ExternalLinkIcon = styled(Icon)`
  vertical-align: baseline;
  display: inline-block;
  position: relative;
  top: 0.125em;
  margin-left: 0.125em;
  color: ${(props) => props.theme.colors.primary};
`;

const query = graphql`
  query PageHeaderSearchInput {
    localSearchSearch {
      index
      store
    }
  }
`;

const PageHeaderSearchInput = (props) => {
  const { input, onChange, dark, floatingResults, className } = props;
  const data = useStaticQuery(query);
  const { index: searchIndex, store: searchStore } = data.localSearchSearch;
  const results = useFlexSearch(input, searchIndex, searchStore);

  return (
    <>
      <PageHeaderSearchInputRoot className={className}>
        <SearchInput
          type="text"
          icon="search"
          value={input}
          onChange={(e) => {
            const { value } = e.target;

            // Prevent sending spaces
            if (value.trim() === "") {
              onChange("");
            } else {
              onChange(value);
            }
          }}
          placeholder="Search…"
          dark={dark}
        />
        {input !== "" && (
          <SearchResultsList floating={floatingResults}>
            {results.length === 0 ? (
              <NoResults>No results matched “{input}”</NoResults>
            ) : (
              results.map((result) => (
                <SearchResult
                  href={result.url}
                  key={result.id}
                  newTab={result.isExternal}
                >
                  <em>{result.type}</em>
                  <strong>
                    {result.title}
                    {result.isExternal && (
                      <ExternalLinkIcon icon="externalLink" />
                    )}
                  </strong>
                  <span>{result.description}</span>
                </SearchResult>
              ))
            )}
          </SearchResultsList>
        )}
      </PageHeaderSearchInputRoot>
      {floatingResults && input !== "" && (
        <PageHeaderSearchInputRootCloseOutside onClick={() => onChange("")} />
      )}
    </>
  );
};

PageHeaderSearchInput.defaultProps = {
  className: "",
  dark: false,
  floatingResults: false,
};

PageHeaderSearchInput.propTypes = {
  input: string.isRequired,
  onChange: func.isRequired,
  dark: bool,
  floatingResults: bool,
  className: string,
};

export default PageHeaderSearchInput;
