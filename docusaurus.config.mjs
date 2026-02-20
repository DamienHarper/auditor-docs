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
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: [
    // Support des diagrammes Mermaid
    '@docusaurus/theme-mermaid',
    // Recherche locale — supporte nativement les multi-instances plugin-content-docs
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        language: 'en',
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchResultLimits: 10,
        // Deux instances plugin-content-docs : auditor et auditor-bundle
        docsRouteBasePath: ['auditor', 'auditor-bundle'],
        docsDir: ['docs/auditor', 'docs/auditor-bundle'],
        // Version préférée tirée du plugin auditor (pour le sélecteur de version)
        docsPluginIdForPreferredVersion: 'auditor',
        // Exclure les anciennes versions de l'index
        ignoreFiles: [
          /auditor\/3\.x/,
          /auditor-bundle\/6\.x/,
        ],
      }),
    ],
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
        gtag: {
          trackingID: 'G-236563744',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  plugins: [
    // Redirections depuis les anciennes URLs Couscous
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
    // Redirections depuis les anciennes URLs Couscous (format /docs/auditor/xxx.html)
    // Doit être en dernier pour que les pages cibles soient déjà générées
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          // ── Entrées principales ───────────────────────────────────────────
          { from: ['/docs/auditor/index.html', '/docs/auditor/index', '/docs/auditor/'], to: '/auditor/intro' },
          { from: ['/docs/auditor-bundle/index.html', '/docs/auditor-bundle/index', '/docs/auditor-bundle/'], to: '/auditor-bundle/intro' },

          // ── auditor ───────────────────────────────────────────────────────
          { from: ['/docs/auditor/installation.html', '/docs/auditor/installation'], to: '/auditor/getting-started/installation' },
          { from: ['/docs/auditor/contributing.html', '/docs/auditor/contributing'], to: '/auditor/contributing' },
          { from: ['/docs/auditor/release-notes.html', '/docs/auditor/release-notes'], to: '/auditor/upgrade' },
          { from: ['/docs/auditor/upgrading.html', '/docs/auditor/upgrading'], to: '/auditor/upgrade' },
          { from: ['/docs/auditor/providers.html', '/docs/auditor/providers'], to: '/auditor/providers/doctrine' },

          // ── auditor-bundle ────────────────────────────────────────────────
          { from: ['/docs/auditor-bundle/installation.html', '/docs/auditor-bundle/installation'], to: '/auditor-bundle/getting-started/installation' },
          { from: ['/docs/auditor-bundle/contributing.html', '/docs/auditor-bundle/contributing'], to: '/auditor-bundle/contributing' },
          { from: ['/docs/auditor-bundle/release-notes.html', '/docs/auditor-bundle/release-notes'], to: '/auditor-bundle/upgrade' },
          { from: ['/docs/auditor-bundle/upgrading.html', '/docs/auditor-bundle/upgrading'], to: '/auditor-bundle/upgrade' },
          // Configuration
          { from: ['/docs/auditor-bundle/configuration/general.html', '/docs/auditor-bundle/configuration/general'], to: '/auditor-bundle/configuration' },
          { from: ['/docs/auditor-bundle/configuration/auditing.html', '/docs/auditor-bundle/configuration/auditing'], to: '/auditor-bundle/configuration/attributes' },
          { from: ['/docs/auditor-bundle/configuration/storage.html', '/docs/auditor-bundle/configuration/storage'], to: '/auditor-bundle/configuration/storage' },
          { from: ['/docs/auditor-bundle/configuration/reference.html', '/docs/auditor-bundle/configuration/reference'], to: '/auditor-bundle/configuration' },
          // Customization
          { from: ['/docs/auditor-bundle/customization/role-checker.html', '/docs/auditor-bundle/customization/role-checker'], to: '/auditor-bundle/customization/role-checker' },
          { from: ['/docs/auditor-bundle/customization/security-provider.html', '/docs/auditor-bundle/customization/security-provider'], to: '/auditor-bundle/customization/security-provider' },
          { from: ['/docs/auditor-bundle/customization/user-provider.html', '/docs/auditor-bundle/customization/user-provider'], to: '/auditor-bundle/customization/user-provider' },
          // Usage — pages renommées/déplacées en 7.x, on redirige vers la page d'accueil
          { from: ['/docs/auditor-bundle/usage/viewer.html', '/docs/auditor-bundle/usage/viewer'], to: '/auditor-bundle/viewer' },
          { from: ['/docs/auditor-bundle/usage/querying.html', '/docs/auditor-bundle/usage/querying'], to: '/auditor-bundle/intro' },
          { from: ['/docs/auditor-bundle/usage/events.html', '/docs/auditor-bundle/usage/events'], to: '/auditor-bundle/intro' },
          { from: ['/docs/auditor-bundle/usage/enabling-disabling-at-runtime.html', '/docs/auditor-bundle/usage/enabling-disabling-at-runtime'], to: '/auditor-bundle/intro' },
          { from: ['/docs/auditor-bundle/usage/maintenance.html', '/docs/auditor-bundle/usage/maintenance'], to: '/auditor-bundle/intro' },
          { from: ['/docs/auditor-bundle/usage/schema-manipulation.html', '/docs/auditor-bundle/usage/schema-manipulation'], to: '/auditor-bundle/intro' },
        ],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true, // mode auto : suit le réglage système
      },
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
