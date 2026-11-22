// Ids of the headings written with an emoji variation selector (U+FE0F, e.g. "## 🗜️ Compression").
//
// The slugger keeps the invisible U+FE0F, so such a heading gets the id "️-compression" while the docs link to
// "#-compression". This plugin computes the id from the heading text without U+FE0F; Docusaurus keeps an id that is
// already set (and still makes duplicates unique). Other headings are left to Docusaurus.
import GithubSlugger from 'github-slugger';
import {toString} from 'mdast-util-to-string';
import {visit} from 'unist-util-visit';

const VARIATION_SELECTOR = /️/g;

export default function headingIdsWithoutVariationSelector() {
  return (root) => {
    visit(root, 'heading', (heading) => {
      const text = toString(heading.children.filter(({type}) => !['html', 'jsx'].includes(type)));
      if (!VARIATION_SELECTOR.test(text) || /\{#[^}]+\}\s*$/.test(text)) {
        return;
      }
      VARIATION_SELECTOR.lastIndex = 0;
      heading.data ??= {};
      heading.data.hProperties ??= {};
      heading.data.hProperties.id ??= GithubSlugger.slug(text.replace(VARIATION_SELECTOR, ''));
    });
  };
}
