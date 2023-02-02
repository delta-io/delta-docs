const docs = [
  {
    url: "/",
    label: "Docs Home",
    title: true,
    icon: "home",
  },
  {
    divider: true,
  },
  {
    url: "/latest/delta-intro",
    label: "Introduction"
  },
  {
    divider: true,
  },
  {
    url: "/latest/quick-start",
    label: "Quick Start",
  },
  {
    url: "/latest/delta-batch",
    label: "Table batch reads and writes",
  },
  {
    url: "/latest/delta-streaming",
    label: "Table streaming reads and writes",
  },
  {
    url: "/latest/delta-update",
    label: "Table deletes, updates, and merges",
  },
  {
    url: "/latest/delta-change-data-feed",
    label: "Change data feed",
  },
  {
    url: "/latest/delta-utility",
    label: "Table utility commands",
  },
  {
    url: "/latest/delta-constraints",
    label: "Constraints",
  },
  {
    url: "/latest/versioning",
    label: "Table protocol versioning",
  },
  {
    url: "/latest/delta-apidoc",
    label: "Delta API Doc",
  },
  {
    url: "/latest/delta-storage",
    label: "Storage configuration",
  },
  {
    url: "/latest/concurrency-control",
    label: "Concurrency Control",
  },
  {
    url: "/latest/integrations",
    label: "Access Delta tables from external data processing engines",
  },
  {
    url: "/latest/porting",
    label: "Migration Guide",
  },
  {
    url: "/latest/best-practices",
    label: "Best Practices",
  },
  {
    url: "/latest/delta-faq",
    label: "Frequently asked questions (FAQ)",
  },
  {
    url: "/latest/releases",
    label: "Releases",
  },
  {
    url: "/latest/delta-resources",
    label: "Delta Lake Resources",
  },
  {
    url: "/latest/optimizations-oss",
    label: "Optimizations",
  },
  {
    url: "/latest/table-properties",
    label: "Delta table properties reference",
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
