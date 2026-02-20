// @ts-check
import { themes } from 'prism-react-renderer';
import remarkGithubBlockquoteAlert from 'remark-github-blockquote-alert';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'auditor',
  tagline: 'A PHP audit log library',
  favicon: 'img/favicon.svg',
  headTags: [
    // Favicon SVG natif (Chrome, Firefox, Safari — s'adapte au dark mode via media query CSS interne)
    { tagName: 'link', attributes: { rel: 'icon', type: 'image/svg+xml', href: '/auditor-docs/img/favicon.svg' } },
    // ICO fallback pour les navigateurs anciens
    { tagName: 'link', attributes: { rel: 'alternate icon', type: 'image/x-icon', href: '/auditor-docs/img/favicon.ico' } },
    // Apple Touch Icon (iOS, macOS Safari bookmarks)
    { tagName: 'link', attributes: { rel: 'apple-touch-icon', sizes: '180x180', href: '/auditor-docs/img/apple-touch-icon.png' } },
  ],
  url: 'https://damienharper.github.io',
  baseUrl: '/auditor-docs/',
  organizationName: 'DamienHarper',
  projectName: 'auditor-docs',
  trailingSlash: false,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Activer le support Mermaid dans les blocs de code
  markdown: {
    mermaid: true,
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: [
    // Support des diagrammes Mermaid
    '@docusaurus/theme-mermaid',
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    // Recherche locale (offline, pas besoin de clé Algolia)
    [
      'docusaurus-lunr-search',
      {
        languages: ['en'],
        highlightResult: true,
        maxHits: 10,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'auditor',
        path: 'docs/auditor',
        routeBasePath: 'auditor',
        sidebarPath: require.resolve('./sidebars-auditor.js'),
        // Exclure les changelogs
        exclude: ['**/changelogs/**'],
        beforeDefaultRemarkPlugins: [remarkGithubBlockquoteAlert],
        lastVersion: 'current',
        versions: {
          current: {
            label: '4.x',
            badge: true,
          },
          '3.x': {
            label: '3.x',
            badge: true,
          },
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'auditor-bundle',
        path: 'docs/auditor-bundle',
        routeBasePath: 'auditor-bundle',
        sidebarPath: require.resolve('./sidebars-auditor-bundle.js'),
        // Exclure les changelogs
        exclude: ['**/changelogs/**'],
        beforeDefaultRemarkPlugins: [remarkGithubBlockquoteAlert],
        lastVersion: 'current',
        versions: {
          current: {
            label: '7.x',
            badge: true,
          },
          '6.x': {
            label: '6.x',
            badge: true,
          },
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'auditor',
        logo: {
          alt: 'auditor logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docsVersionDropdown',
            docsPluginId: 'auditor',
            position: 'left',
            dropdownActiveClassDisabled: true,
          },
          {
            to: '/auditor/intro',
            label: 'auditor',
            position: 'left',
            activeBaseRegex: '/auditor/',
          },
          {
            type: 'docsVersionDropdown',
            docsPluginId: 'auditor-bundle',
            position: 'left',
            dropdownActiveClassDisabled: true,
          },
          {
            to: '/auditor-bundle/intro',
            label: 'auditor-bundle',
            position: 'left',
            activeBaseRegex: '/auditor-bundle/',
          },
          {
            href: 'https://github.com/DamienHarper/auditor',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'auditor',
            items: [
              { label: 'Documentation (4.x)', to: '/auditor/intro' },
              { label: 'GitHub', href: 'https://github.com/DamienHarper/auditor' },
            ],
          },
          {
            title: 'auditor-bundle',
            items: [
              { label: 'Documentation (7.x)', to: '/auditor-bundle/intro' },
              { label: 'GitHub', href: 'https://github.com/DamienHarper/auditor-bundle' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Damien Harper. Built with Docusaurus.`,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
        additionalLanguages: ['php', 'bash', 'yaml'],
      },
      // Thème Mermaid (optionnel : personnalisation)
      mermaid: {
        theme: { light: 'neutral', dark: 'dark' },
      },
    }),
};

export default config;
