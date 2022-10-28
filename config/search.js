const searchPluginConfig = {
  resolve: "gatsby-plugin-local-search",
  options: {
    name: "search",
    engine: "flexsearch",
    query: `
      query SearchPluginQuery {
        allSitePage(filter: {component: {regex: "/mdx$/"}}) {
          nodes {
            id
            pageContext
            path
          }
        }
      }
    `,
    index: ["title"],
    normalizer: ({ data }) =>
      data.allSitePage.nodes.map(({ node }) => ({
        id: node.id,
        title: node.pageContext.frontmatter.title,
        description: node.pageContext.frontmatter.description,
        url: node.path,
        isExternal: false,
      })),
  },
};

module.exports = {
  searchPluginConfig,
};
