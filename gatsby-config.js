const scala = require("highlight.js/lib/languages/scala");
const { searchPluginConfig } = require("./config/search");

const wrapESMPlugin =
  (name) =>
  (opts) =>
  async (...args) => {
    const mod = await import(name);
    const plugin = mod.default(opts);
    return plugin(...args);
  };

module.exports = {
  siteMetadata: {
    title: "Delta Lake",
    siteUrl: "https://delta.io",
    description:
      "Delta Lake is an open-source storage framework that enables building a Lakehouse architecture with compute engines including Spark, PrestoDB, Flink, Trino, and Hive and APIs for Scala, Java, Rust, Ruby, and Python.",
    twitter: "@DeltaLakeOSS",
  },
  plugins: [
    "gatsby-plugin-netlify",
    "gatsby-plugin-anchor-links",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Delta Lake",
        short_name: "Delta Lake",
        start_url: "/",
        background_color: "#042436",
        theme_color: "#00ADD4",
        icon: "src/images/icon.png",
        icon_options: {
          purpose: "maskable",
        },
      },
    },
    {
      resolve: "gatsby-plugin-google-gtag",
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 684 * 2,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              ignoreFileExtensions: ["png", "jpg", "jpeg"],
            },
          },
        ],
        mdxOptions: {
          // eslint-disable-next-line global-require
          remarkPlugins: [require("remark-gfm")],
          rehypePlugins: [
            wrapESMPlugin("rehype-slug"),
            [wrapESMPlugin("rehype-highlight"), { languages: { scala } }],
          ],
        },
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    searchPluginConfig,
  ],
};
