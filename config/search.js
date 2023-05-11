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
            tableOfContents
          }
        }
      }
    `,
    index: ["title"],
    normalizer: ({ data }) =>
      data.allMdx.nodes.flatMap((node) => {
        // return at least the main page ("node")
        const returnVal = [
          {
            id: node.id,
            title: node.frontmatter.title,
            description: node.frontmatter.description,
            url: node.fields.path,
            isExternal: false,
            toc: node.tableOfContents,
          },
        ];

        // add the headers  too if they're in ToC
        if (node.tableOfContents.items != null) {
          node.tableOfContents.items.map((header) =>
            returnVal.push({
              id: node.id.concat(header.url),
              title: node.frontmatter.title.concat(" - ", header.title),
              url: node.fields.path.concat(header.url),
              isExternal: false,
            })
          );
        }

        return returnVal;
      }),
  },
};

module.exports = {
  searchPluginConfig,
};
