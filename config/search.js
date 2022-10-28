const searchPluginConfig = {
  resolve: "gatsby-plugin-local-search",
  options: {
    name: "search",
    engine: "flexsearch",
    query: `
      query SearchPluginQuery {
        allSitePage(filter: {component: {regex: "/mdx$/"}}) {
          nodes {
            componentChunkName
            pageContext
            path
          }
        }
      }
    `,
    index: ["title"],
    normalizer: ({ data }) => [],
    // return data.allSitePage.nodes.map(({ node }) => ({
    //   id: node.componentChunkName,
    //   title: node.pageContext.frontmatter.title,
    //   description: node.pageContext.frontmatter.description,
    //   url: node.path,
    //   isExternal: false,
    // }));
  },
};

module.exports = {
  searchPluginConfig,
};
