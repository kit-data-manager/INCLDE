import { newSpecPage } from '@stencil/core/testing';
import { IncldeSidebarElement } from '../inclde-sidebar-element';

describe('inclde-sidebar-element', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IncldeSidebarElement],
      html: `<inclde-sidebar-element></inclde-sidebar-element>`,
    });
    expect(page.root).toEqualHtml(`
      <inclde-sidebar-element>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </inclde-sidebar-element>
    `);
  });
});
