import { newSpecPage } from '@stencil/core/testing';
import { IncldeSidebar } from '../inclde-sidebar';

describe('inclde-sidebar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IncldeSidebar],
      html: `<inclde-sidebar></inclde-sidebar>`,
    });
    expect(page.root).toEqualHtml(`
      <inclde-sidebar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </inclde-sidebar>
    `);
  });
});
