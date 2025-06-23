import {
  printArrayInitializer,
  printList,
  map,
  type JavaNodePrinters
} from "./helpers.js";
import { builders } from "prettier/doc";

const { join, softline } = builders;

export default {
  arrayInitializer(path, print, options) {
    return printArrayInitializer(
      path,
      print,
      options,
      "variableInitializerList"
    );
  },

  variableInitializerList(path, print, options) {
    const items = map(path, print, "variableInitializer");
    if (options?.braceStyle === "next-line") {
      return join([",", softline], items);
    }
    return printList(path, print, "variableInitializer");
  }
} satisfies Partial<JavaNodePrinters>;
