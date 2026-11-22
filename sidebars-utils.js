// @ts-check
const fs = require('fs');
const path = require('path');

/**
 * Drops the sidebar entries whose page does not exist in the docs folder, and the categories left empty.
 *
 * The docs of each package are copied here by its sync-docs.yml workflow when a tag is pushed, but the
 * sidebars are not: a sidebar can therefore list the pages of the next major before they are synced, and
 * `docs:version` freezes the sidebar of the previous major with only the pages it actually has.
 *
 * @param {string} docsDir docs folder of the plugin, e.g. docs/auditor
 * @param {any[]} items sidebar items
 * @returns {any[]}
 */
function onlyExistingDocs(docsDir, items) {
  const exists = (id) => ['.md', '.mdx'].some((ext) => fs.existsSync(path.join(docsDir, `${id}${ext}`)));

  return items.flatMap((item) => {
    if ('string' === typeof item) {
      return exists(item) ? [item] : [];
    }
    if ('doc' === item.type) {
      return exists(item.id) ? [item] : [];
    }
    if ('category' === item.type) {
      const children = onlyExistingDocs(docsDir, item.items);
      return children.length > 0 ? [{...item, items: children}] : [];
    }
    return [item];
  });
}

module.exports = {onlyExistingDocs};
