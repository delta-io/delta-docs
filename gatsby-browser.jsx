const React = require("react");
const { DefaultLayout } = require("./src/layouts/DefaultLayout");
require("bootstrap/dist/css/bootstrap.min.css");

exports.wrapPageElement = ({ element, props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <DefaultLayout {...props}>{element}</DefaultLayout>
);
