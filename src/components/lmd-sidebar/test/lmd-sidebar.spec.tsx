import { newSpecPage } from '@stencil/core/testing';
import { LmdSidebar } from '../lmd-sidebar';

describe('lmd-sidebar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LmdSidebar],
      html: `<lmd-sidebar></lmd-sidebar>`,
    });
    expect(page.root).toEqualHtml(`
      <lmd-sidebar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </lmd-sidebar>
    `);
  });
});
