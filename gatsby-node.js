const path = require("path");

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        config: path.resolve("./config"),
        src: path.resolve("./src"),
      },
    },
  });
};
