import * as React from "react";
import SEO from "src/components/SEO";
import PageLayout from "src/components/PageLayout";
import MDX from "src/components/MDX";
import { TypographyContainer } from "src/components/Typography";
import * as menus from "config/menus";
import Section from "src/components/Section";
import OneColumnLayout from "./components/OneColumnLayout";
import TwoColumnLayout from "./components/TwoColumnLayout";

export const DefaultLayout = (props) => {
  console.log(props);
  const { location, pageContext, children } = props;
  const { frontmatter = {} } = pageContext;

  const sidebarMenu = menus[frontmatter.menu];

  const content = (
    <Section title={frontmatter.title} primary container={false}>
      <TypographyContainer>
        <MDX>{children}</MDX>
      </TypographyContainer>
    </Section>
  );

  return (
    <PageLayout>
      {sidebarMenu ? (
        <TwoColumnLayout
          sidebarMenu={sidebarMenu}
          currentPathname={location.pathname}
        >
          {content}
        </TwoColumnLayout>
      ) : (
        <OneColumnLayout width={frontmatter.width}>{content}</OneColumnLayout>
      )}
    </PageLayout>
  );
};

export const Head = ({ data }) => {
  const { frontmatter = {} } = data.mdx;
  const { title, description, thumbnail } = frontmatter;

  return (
    <SEO
      title={title}
      description={description}
      thumbnailPath={thumbnail?.publicURL}
    />
  );
};
