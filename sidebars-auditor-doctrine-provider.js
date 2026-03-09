// @ts-check
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  auditorDoctrineProviderSidebar: [
    {
      type: 'doc',
      id: 'index',
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
      type: 'doc',
      id: 'providers/doctrine/configuration',
      label: 'Configuration',
    },
    {
      type: 'doc',
      id: 'providers/doctrine/schema',
      label: 'Schema',
    },
    {
      type: 'doc',
      id: 'providers/doctrine/attributes',
      label: 'Attributes',
    },
    {
      type: 'doc',
      id: 'providers/doctrine/services',
      label: 'Services',
    },
    {
      type: 'doc',
      id: 'providers/doctrine/multi-database',
      label: 'Multi-database',
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
    'extra-data',
    'contributing',
  ],
};
module.exports = sidebars;
