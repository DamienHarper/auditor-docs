// @ts-check
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  auditorSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
      ],
    },
    {
      type: 'category',
      label: 'Configuration',
      items: [
        'configuration/index',
        'configuration/user-provider',
        'configuration/security-provider',
        'configuration/role-checker',
      ],
    },
    {
      type: 'category',
      label: 'Providers',
      items: [
        {
          type: 'category',
          label: 'Doctrine',
          items: [
            'providers/doctrine/index',
            'providers/doctrine/configuration',
            'providers/doctrine/schema',
            'providers/doctrine/attributes',
            'providers/doctrine/services',
            'providers/doctrine/multi-database',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Querying',
      items: [
        'querying/index',
        'querying/entry',
        'querying/filters',
      ],
    },
    'commands/index',
    'api/index',
    'extra-data',
    'contributing',
    {
      type: 'category',
      label: 'Upgrade Guide',
      items: [
        'upgrade/index',
        'upgrade/v3',
        'upgrade/v4',
      ],
    },
  ],
};
module.exports = sidebars;
