import path from "path";
import url from "url";
import { testSampleWithOptions } from "../../test-utils.js";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

describe("else-if formatting", () => {
  testSampleWithOptions({
    testFolder: __dirname,
  });
});
