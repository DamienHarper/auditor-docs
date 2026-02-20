// @ts-check
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  auditorBundleSidebar: [
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
      ],
    },
    {
      type: 'category',
      label: 'Configuration',
      items: [
        'configuration/index',
        'configuration/storage',
        'configuration/attributes',
      ],
    },
    {
      type: 'category',
      label: 'Customization',
      items: [
        'customization/index',
        'customization/user-provider',
        'customization/security-provider',
        'customization/role-checker',
        'customization/extra-data',
      ],
    },
    'viewer/index',
    'contributing',
    {
      type: 'category',
      label: 'Upgrade Guide',
      items: [
        'upgrade/index',
        'upgrade/v7',
      ],
    },
  ],
};
module.exports = sidebars;
