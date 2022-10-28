// Colors
export const colors = {
  primary: "#00add4",
  link: "#00819e",
  accent: "#ffda47",
  text: "#002638",
  textSecondary: "#536974",
  bgLight: "#f5f8f9",
  bgDark: "#042436",
  border: "#B9C0C1",
  info: "#00add4",
  warning: "#ffda47",
  danger: "red",
};

// Color mixins
export const dark = {
  bg: colors.bgDark,
  color: "#FFFFFF",
  textSecondary: "#73828C",
  border: "#2C4553",
};
export const light = {
  bg: colors.bgLight,
  color: colors.text,
};

// Typography
export const fontSizeBase = 16;
export const rem = (size) => `${size / fontSizeBase}rem`;
export const fontSizes = {
  small: rem(14),
  primary: rem(18),
  secondary: rem(16),
  h1: rem(54),
  h2: rem(42),
  h3: rem(32),
  h4: rem(25),
  h5: rem(20),
  h6: rem(16),
  code: rem(16 * 0.9),
};
export const lineHeightBase = 1.5;
export const lineHeightHeader = 1.2;
export const fontWeightBold = 600;
export const fontFamilyBase = [
  "Source Sans Pro",
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  "Roboto",
  '"Helvetica Neue"',
  "Arial",
  "sans-serif",
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(",");
export const fontFamilyCode = "Source Code Pro, Consolas, monospace";

// Grid
export const spacingRem = {
  xs: 6,
  sm: 12,
  md: 18,
  lg: 24,
  xl: 30,
  xxl: 60,
};
export const spacing = {
  none: rem(0),
  xs: rem(6),
  sm: rem(12),
  md: rem(18),
  lg: rem(24),
  xl: rem(40),
  xxl: rem(60),
  xxxl: rem(100),
};
export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

export const breakpointGreaterThan = (test) => (size) => {
  const sizes = Object.keys(breakpoints);

  return (
    sizes.findIndex((bp) => bp === size) > sizes.findIndex((bp) => bp === test)
  );
};

/**
 * Creates a function which wraps CSS rules in a media query set to the provided
 * breakpoint and above.
 *
 * @param {string} breakpoint The breakpoint to wrap the CSS rule in. If an invalid breakpoint is passed, nothing will output.
 * @returns {function} Function to wrap rules in a media query
 */
export const mediaBreakpointUp = (breakpoint) => (rules) => {
  if (!breakpoints[breakpoint]) {
    return "";
  }

  return `@media (min-width: ${breakpoints[breakpoint]}px) {
    ${rules}
  }`;
};

/**
 * Creates a function which wraps CSS rules in a media query set to below the
 * provided breakpoint.
 *
 * @param {string} breakpoint The breakpoint to wrap the CSS rule in. If an invalid breakpoint is passed, nothing will output.
 * @returns {function} Function to wrap rules in a media query
 */
export const mediaBreakpointDown = (breakpoint) => (rules) => {
  if (!breakpoints[breakpoint]) {
    return "";
  }

  return `@media (max-width: ${breakpoints[breakpoint] - 1}px) {
    ${rules}
  }`;
};

/**
 * Creates a function which wraps CSS rules in a media query set to below the
 * provided breakpoint.
 *
 * @param {string} breakpoint The breakpoint to wrap the CSS rule in. If an invalid breakpoint is passed, nothing will output.
 * @returns {function} Function to wrap rules in a media query
 */
export const mediaBreakpointBetween =
  (minBreakpoint, maxBreakpoint) => (rules) => {
    if (!breakpoints[minBreakpoint] || !breakpoints[maxBreakpoint]) {
      return "";
    }

    return `@media (min-width: ${
      breakpoints[minBreakpoint]
    }px) and (max-width: ${breakpoints[maxBreakpoint] - 1}px) {
    ${rules}
  }`;
  };

/**
 * Maps rules to breakpoints.
 *
 * @param {object} ruleMap The rule map. Equal to { [breakpoint]: rules }.
 * @returns {string} CSS rules
 */
export const mediaBreakpointMap = (rulesMap) => {
  const breakpointSortOrder = Object.keys(breakpoints);

  return Object.entries(rulesMap)
    .sort(
      ([a], [b]) =>
        breakpointSortOrder.indexOf(a) - breakpointSortOrder.indexOf(b)
    )
    .reduce((styles, [breakpoint, rules]) => {
      if (breakpoint === "xs") {
        return [...styles, rules];
      }

      if (breakpoints[breakpoint]) {
        return [...styles, mediaBreakpointUp(breakpoint)(rules)];
      }

      return styles;
    }, [])
    .join("\n");
};

/**
 * Combines multiple breakpoint maps together
 *
 * @param {object[]} ruleMaps Collection of ruleMaps
 * @returns {string} CSS rules
 */
export const mediaBreakpointMaps = (ruleMaps) => {
  const combinedMap = ruleMaps.reduce((combinedRulesMap, ruleMap) => {
    let updatedRulesMap = combinedRulesMap;

    Object.entries(ruleMap).forEach(([breakpoint, rules]) => {
      updatedRulesMap = {
        ...updatedRulesMap,
        [breakpoint]: `${
          updatedRulesMap[breakpoint] ? `${updatedRulesMap[breakpoint]}\n` : ""
        }${rules}`,
      };
    });

    return updatedRulesMap;
  }, {});

  return mediaBreakpointMap(combinedMap);
};
