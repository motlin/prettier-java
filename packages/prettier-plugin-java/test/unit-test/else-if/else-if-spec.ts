import { testSample } from "../../test-utils.js";

describe("else-if formatting", () => {
  // With default braceStyle (same-line)
  testSample(__dirname, "else-if-input", {
    prettierOptions: {
      braceStyle: "same-line",
    },
  });

  // With next-line braceStyle
  testSample(__dirname, "else-if-input", {
    prettierOptions: {
      braceStyle: "next-line",
    },
    expectedSampleSuffix: "-next-line",
  });
});
