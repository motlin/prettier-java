import type { Doc } from "prettier";
import { builders } from "prettier/doc";
import {
  call,
  each,
  hasDeclarationAnnotations,
  indentInParentheses,
  lineEndWithComments,
  lineStartWithComments,
  onlyDefinedKey,
  printArrayInitializer,
  printBlock,
  formatWithBraces,
  printClassPermits,
  printList,
  printSingle,
  printWithModifiers,
  type JavaNodePrinters,
  type JavaParserOptions
} from "./helpers.js";

const { group, hardline, indent, join, line } = builders;

export default {
  interfaceDeclaration(path, print) {
    const declarationKey = onlyDefinedKey(path.node.children, [
      "annotationInterfaceDeclaration",
      "normalInterfaceDeclaration"
    ]);
    return printWithModifiers(
      path,
      print,
      "interfaceModifier",
      call(path, print, declarationKey),
      true
    );
  },

  normalInterfaceDeclaration(path, print, options) {
    const { interfaceExtends, interfacePermits, typeParameters } =
      path.node.children;
    const header = ["interface ", call(path, print, "typeIdentifier")];
    if (typeParameters) {
      header.push(call(path, print, "typeParameters"));
    }
    if (interfaceExtends) {
      header.push(indent([line, call(path, print, "interfaceExtends")]));
    }
    if (interfacePermits) {
      header.push(indent([line, call(path, print, "interfacePermits")]));
    }
    const declaration = group(header);
    const body = call(path, print, "interfaceBody");
    return formatWithBraces(declaration, body, options);
  },

  interfaceModifier: printSingle,

  interfaceExtends(path, print) {
    return group([
      "extends",
      indent([line, call(path, print, "interfaceTypeList")])
    ]);
  },

  interfacePermits: printClassPermits,

  interfaceBody(path, print, options) {
    const declarations: Doc[] = [];
    let previousRequiresPadding = false;
    each(
      path,
      declarationPath => {
        const declaration = print(declarationPath);
        if (declaration === "") {
          return;
        }
        const { node, previous } = declarationPath;
        const constantDeclaration =
          node.children.constantDeclaration?.[0].children;
        const methodDeclaration =
          node.children.interfaceMethodDeclaration?.[0].children;
        const currentRequiresPadding =
          (!constantDeclaration && !methodDeclaration) ||
          methodDeclaration?.methodBody[0].children.block !== undefined ||
          hasDeclarationAnnotations(
            constantDeclaration?.constantModifier ??
              methodDeclaration?.interfaceMethodModifier ??
              []
          );
        const blankLine =
          declarations.length > 0 &&
          (previousRequiresPadding ||
            currentRequiresPadding ||
            lineStartWithComments(node) > lineEndWithComments(previous!) + 1);
        declarations.push(blankLine ? [hardline, declaration] : declaration);
        previousRequiresPadding = currentRequiresPadding;
      },
      "interfaceMemberDeclaration"
    );
    return printBlock(path, declarations, options);
  },

  interfaceMemberDeclaration(path, print) {
    const { children } = path.node;
    return children.Semicolon
      ? ""
      : call(path, print, onlyDefinedKey(children));
  },

  constantDeclaration(path, print) {
    const declaration = [
      call(path, print, "unannType"),
      " ",
      call(path, print, "variableDeclaratorList"),
      ";"
    ];
    return printWithModifiers(path, print, "constantModifier", declaration);
  },

  constantModifier: printSingle,

  interfaceMethodDeclaration(path, print, options) {
    const methodHeader = call(path, print, "methodHeader");
    const methodBody = call(path, print, "methodBody");
    const isAbstract = path.node.children.methodBody[0].children.Semicolon;

    if (isAbstract) {
      return printWithModifiers(path, print, "interfaceMethodModifier", [
        methodHeader,
        ";"
      ]);
    }

    const declaration = formatWithBraces(methodHeader, methodBody, options);
    return printWithModifiers(
      path,
      print,
      "interfaceMethodModifier",
      declaration
    );
  },

  interfaceMethodModifier: printSingle,

  annotationInterfaceDeclaration(path, print, options) {
    const declaration = join(" ", [
      "@interface",
      call(path, print, "typeIdentifier")
    ]);
    const body = call(path, print, "annotationInterfaceBody");
    return formatWithBraces(declaration, body, options);
  },

  annotationInterfaceBody(path, print, options) {
    const declarations: Doc[] = [];
    each(
      path,
      declarationPath => {
        const declaration = print(declarationPath);
        if (declaration === "") {
          return;
        }
        declarations.push(
          declarationPath.isFirst ? declaration : [hardline, declaration]
        );
      },
      "annotationInterfaceMemberDeclaration"
    );
    return printBlock(path, declarations, options);
  },

  annotationInterfaceMemberDeclaration(path, print) {
    const { children } = path.node;
    return children.Semicolon
      ? ""
      : call(path, print, onlyDefinedKey(children));
  },

  annotationInterfaceElementDeclaration(path, print) {
    const { dims, defaultValue } = path.node.children;
    const declaration = [
      call(path, print, "unannType"),
      " ",
      call(path, print, "Identifier"),
      "()"
    ];
    if (dims) {
      declaration.push(call(path, print, "dims"));
    }
    if (defaultValue) {
      declaration.push(" ", call(path, print, "defaultValue"));
    }
    declaration.push(";");
    return printWithModifiers(
      path,
      print,
      "annotationInterfaceElementModifier",
      declaration
    );
  },

  annotationInterfaceElementModifier: printSingle,

  defaultValue(path, print) {
    return ["default ", call(path, print, "elementValue")];
  },

  annotation(path, print) {
    const { children } = path.node;
    const annotation = ["@", call(path, print, "typeName")];
    if (children.elementValue || children.elementValuePairList) {
      const valuesKey = onlyDefinedKey(children, [
        "elementValue",
        "elementValuePairList"
      ]);
      annotation.push(indentInParentheses(call(path, print, valuesKey)));
    }
    return annotation;
  },

  elementValuePairList(path, print) {
    return printList(path, print, "elementValuePair");
  },

  elementValuePair(path, print) {
    return join(" ", [
      call(path, print, "Identifier"),
      call(path, print, "Equals"),
      call(path, print, "elementValue")
    ]);
  },

  elementValue: printSingle,

  elementValueArrayInitializer(path, print, options) {
    return printArrayInitializer(path, print, options, "elementValueList");
  },

  elementValueList(path, print) {
    return group(printList(path, print, "elementValue"));
  }
} satisfies Partial<JavaNodePrinters>;
