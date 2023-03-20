import { newSpecPage } from '@stencil/core/testing';
import { LmdViewLink } from '../lmd-view-link';

describe('lmd-view-link', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LmdViewLink],
      html: `<lmd-view-link></lmd-view-link>`,
    });
    expect(page.root).toEqualHtml(`
      <lmd-view-link>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </lmd-view-link>
    `);
  });
});
