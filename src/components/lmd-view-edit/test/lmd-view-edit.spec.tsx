import { newSpecPage } from '@stencil/core/testing';
import { LmdViewEdit } from '../lmd-view-edit';

describe('lmd-view-edit', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LmdViewEdit],
      html: `<lmd-view-edit></lmd-view-edit>`,
    });
    expect(page.root).toEqualHtml(`
      <lmd-view-edit>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </lmd-view-edit>
    `);
  });
});
