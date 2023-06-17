// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Popyt',
  tagline: 'A very easy to use Youtube Data API wrapper.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://brandonbothell.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/popyt/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'brandonbothell', // Usually your GitHub org/user name.
  projectName: 'popyt', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },

  trailingSlash: false,

  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        sidebar: {
          categoryLabel: 'API Documentation',
          position: 10
        },
        includeExtension: false
      }
    ]
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/brandonbothell/popyt/tree/master/docusaurus/templates/shared/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      })
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      // image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Popyt',
        logo: {
          alt: 'Docusaurus Logo',
          src: 'img/logo.svg'
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial'
          },
          {
            type: 'docSidebar',
            sidebarId: 'documentationSidebar',
            position: 'left',
            label: 'Documentation'
          },
          {
            href: 'https://github.com/brandonbothell/popyt',
            label: 'GitHub',
            position: 'right'
          }
        ]
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/tutorial/intro'
              },
              {
                label: 'API Documentation',
                to: '/docs/api'
              }
            ]
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/youtube-api'
              },
              {
                label: 'GitHub Discussions',
                href: 'https://github.com/brandonbothell/popyt/discussions'
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/brandonbothell'
              }
            ]
          },
          {
            title: 'More',
            items: [
              {
                label: 'NPM',
                href: 'https://www.npmjs.com/package/popyt'
              },
              {
                label: 'GitHub',
                href: 'https://github.com/brandonbothell/popyt'
              }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Brandon Bothell. Built with Docusaurus.`
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      }
    })
}

module.exports = config
