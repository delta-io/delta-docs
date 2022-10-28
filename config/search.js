const searchPluginConfig = {
  resolve: "gatsby-plugin-local-search",
  options: {
    name: "search",
    engine: "flexsearch",
    query: `
      query SearchPluginQuery {
        allMdx {
          nodes {
            id
            frontmatter {
              title
              description
            }
            excerpt
            fields {
              path
            }
          }
        }
      }
    `,
    index: ["title"],
    normalizer: ({ data }) =>
      data.allMdx.nodes.map((node) => ({
        id: node.id,
        title: node.frontmatter.title,
        description: node.frontmatter.description,
        url: node.fields.path,
        isExternal: false,
      })),
  },
};

module.exports = {
  searchPluginConfig,
};
