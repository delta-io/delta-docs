const docs = [
  {
    url: "/",
    label: "Docs Home",
  },
  {
    url: "/spark/",
    label: "Delta Lake Spark",
    items: [
      {
        url: "/spark/delta-intro",
        label: "Delta Intro",
      },
      {
        url: "/spark/quick-start-oss",
        label: "Quick Start",
      },
      {
        url: "/spark/batch",
        label: "Batch",
      },
      {
        url: "/spark/streaming",
        label: "Streaming",
      },
      {
        url: "/spark/updates",
        label: "Updates",
      },
      {
        url: "/spark/utilities",
        label: "Utilities",
      },
      {
        url: "/spark/constraints",
        label: "Constraints",
      },
      {
        url: "/spark/versioning-oss",
        label: "Versioning",
      },
      {
        url: "/spark/delta-apidoc",
        label: "Delta API Doc",
      },
      {
        url: "/spark/getting-started",
        label: "Getting Started",
      },
      {
        url: "/spark/delta-storage-oss",
        label: "Delta Storage",
      },
      {
        url: "/spark/concurrency-control",
        label: "Concurrency Control",
      },
      {
        url: "/spark/best-practices",
        label: "Best Practices",
      },
      {
        url: "/spark/delta-faq",
        label: "Delta FAQ",
      },
      {
        url: "/spark/releases-oss",
        label: "Releases",
      },
      {
        url: "/spark/delta-resources",
        label: "Delta Resources",
      },
      {
        url: "/spark/delta-column-mapping",
        label: "Delta Column Mapping",
      },
      {
        url: "/spark/porting",
        label: "Porting", // migration guide
      },
    ],
  },
];

const main = [
  {
    label: "Docs",
    url: "/",
  },
  {
    label: "Delta Lake",
    url: "https://delta.io",
  },
];

const social = [
  {
    label: "StackOverflow",
    url: "https://stackoverflow.com/questions/tagged/delta-lake",
    icon: "stackOverflow",
  },
  {
    label: "Twitter",
    url: "https://twitter.com/DeltaLakeOSS",
    icon: "twitter",
  },
  {
    label: "Slack Group",
    url: "https://go.delta.io/slack",
    icon: "slack",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/deltalake",
    icon: "linkedin",
  },
];

const community = [
  {
    url: "https://delta.io/community",
    label: "Community",
  },
  {
    url: "https://delta.io/resources/getting-help",
    label: "Getting Help",
  },
  {
    url: "https://delta.io/resources/contributing-to-delta",
    label: "Contributing to Delta",
  },
];

const learn = [
  {
    label: "Getting Started",
    url: "https://delta.io/learn/getting-started",
  },
  {
    label: "Blogs",
    url: "https://delta.io/blog",
  },
  {
    label: "Tutorials",
    url: "https://delta.io/learn/tutorials/",
  },
  {
    label: "Videos",
    url: "https://delta.io/learn/videos/",
  },
];

const footer = [
  {
    url: "https://delta.io/sharing/",
    label: "Sharing",
  },
  {
    url: "https://delta.io/integrations/",
    label: "Integrations",
  },
  {
    url: "https://delta.io/roadmap",
    label: "Roadmap",
  },
  {
    url: "https://delta.io/blog/",
    label: "Blogs",
  },
];

module.exports = {
  docs,
  community,
  footer,
  learn,
  main,
  social,
};
