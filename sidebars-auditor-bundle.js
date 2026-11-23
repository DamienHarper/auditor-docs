// @ts-check
const path = require('path');
const {onlyExistingDocs} = require('./sidebars-utils');

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  auditorBundleSidebar: onlyExistingDocs(path.join(__dirname, 'docs/auditor-bundle'), [
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
        'customization/blame-context',
        'customization/diff-label-resolvers',
        'customization/histories',
        'customization/custom-provider',
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
        'upgrade/v8',
      ],
    },
  ]),
};
module.exports = sidebars;
