import * as React from "react";
import SEO from "src/components/SEO";
import PageLayout from "src/components/PageLayout";
import MDX from "src/components/MDX";
import { TypographyContainer } from "src/components/Typography";
import * as menus from "config/menus";
import Section from "src/components/Section";
import TwoColumnLayout from "./components/TwoColumnLayout";

export const DefaultLayout = (props) => {
  const { location, pageContext, children } = props;
  const { frontmatter = {} } = pageContext;

  const sidebarMenu = menus["docs" || frontmatter.menu];

  return (
    <PageLayout>
      <TwoColumnLayout
        sidebarMenu={sidebarMenu}
        currentPathname={location.pathname}
      >
        <Section title={frontmatter.title} primary container={false}>
          <TypographyContainer>
            <MDX>{children}</MDX>
          </TypographyContainer>
        </Section>
      </TwoColumnLayout>
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
