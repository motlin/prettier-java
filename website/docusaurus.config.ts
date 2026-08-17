import type { Options, ThemeConfig } from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes } from "prism-react-renderer";
import { repository as repositoryMetadata } from "../package.json";

const repository = repositoryMetadata.url
  .replace(/^git\+/, "")
  .replace(/\.git$/, "");
const [, organizationName, projectName] = new URL(repository).pathname.split(
  "/"
);
const url = `https://${organizationName}.github.io`;
const baseUrl = `/${projectName}/`;
const editUrl = `${repository}/tree/main/website/`;

export default {
  title: "Prettier Java Next Line",
  tagline: "Java formatting with structurally aligned braces",
  favicon: "img/favicon.png",
  trailingSlash: false,
  url,
  baseUrl,
  organizationName,
  projectName,
  i18n: {
    defaultLocale: "en",
    locales: ["en"]
  },
  presets: [
    [
      "classic",
      {
        docs: { editUrl },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css"
        }
      } satisfies Options
    ]
  ],
  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true
    },
    image: "img/banner-dark.png",
    navbar: {
      title: "Prettier Java Next Line",
      logo: {
        alt: "Prettier Java Next Line Logo",
        src: "img/icon.svg",
        srcDark: "img/icon-dark.svg"
      },
      items: [
        { label: "Playground", to: "/playground", position: "left" },
        { label: "Docs", to: "/docs", position: "left" },
        { label: "GitHub", to: repository, position: "right" }
      ]
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Project",
          items: [
            { label: "Why Next Line", to: "/docs" },
            { label: "Installation", to: "/docs/installation" }
          ]
        },
        {
          title: "Upstream",
          items: [
            {
              label: "Prettier Java",
              to: "https://github.com/jhipster/prettier-java"
            },
            {
              label: "Declined Proposal",
              to: "https://github.com/jhipster/prettier-java/pull/840"
            }
          ]
        },
        {
          title: "More",
          items: [
            { label: "GitHub", to: repository },
            { label: "Issues", to: `${repository}/issues` }
          ]
        }
      ]
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.dracula,
      additionalLanguages: ["bash", "java"]
    }
  } satisfies ThemeConfig,
  plugins: [
    () => ({
      name: "webpack-config-plugin",
      configureWebpack(_, isServer) {
        return {
          resolve: {
            ...(!isServer && {
              fallback: {
                "fs/promises": false,
                module: false
              }
            })
          },
          externals: {
            ...(isServer && {
              "prettier-plugin-java": "commonjs prettier-plugin-java",
              "web-tree-sitter": "commonjs web-tree-sitter"
            })
          }
        };
      }
    })
  ]
} satisfies Config;
