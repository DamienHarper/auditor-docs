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
      type: 'category',
      label: 'DoctrineProvider',
      items: [
        'providers/doctrine/index',
        'providers/doctrine/configuration',
        'providers/doctrine/schema',
        'providers/doctrine/attributes',
        'providers/doctrine/services',
        'providers/doctrine/multi-database',
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
    'extra-data',
    'contributing',
  ],
};
module.exports = sidebars;
