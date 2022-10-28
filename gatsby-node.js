const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

/**
 * 1. Add "path" field to MDX pages so we can link to them in search results
 */
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  // [1]
  if (node.internal.type === "Mdx") {
    const pathField = createFilePath({
      node,
      getNode,
    });

    createNodeField({
      node,
      name: "path",
      value: pathField,
    });
  }
};

/**
 * 1. Add support to resolve top-level directories
 */
exports.onCreateWebpackConfig = ({ actions }) => {
  // [1]
  actions.setWebpackConfig({
    resolve: {
      alias: {
        config: path.resolve("./config"),
        src: path.resolve("./src"),
      },
    },
  });
};
