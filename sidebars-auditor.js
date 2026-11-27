// @ts-check
const path = require('path');
const {onlyExistingDocs} = require('./sidebars-utils');

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  auditorSidebar: onlyExistingDocs(path.join(__dirname, 'docs/auditor'), [
    {
      type: 'doc',
      id: 'index',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/which-packages',
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/coming-from-doctrine-audit-bundle',
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
        'configuration/blame-context',
      ],
    },
    {
      type: 'category',
      label: 'Providers',
      items: [
        'providers/doctrine/index',
        'providers/custom-provider',
      ],
    },
    {
      type: 'doc',
      id: 'querying/index',
      label: 'Querying Audits',
    },
    'commands/index',
    'api/index',
    'history',
    'extra-data',
    'common-mistakes',
    'contributing',
    {
      type: 'category',
      label: 'Upgrade Guide',
      items: [
        'upgrade/index',
        'upgrade/v3',
        'upgrade/v4',
        'upgrade/v5',
      ],
    },
  ]),
};
module.exports = sidebars;
