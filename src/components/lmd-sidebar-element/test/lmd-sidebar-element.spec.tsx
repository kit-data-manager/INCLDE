import { newSpecPage } from '@stencil/core/testing';
import { LmdSidebarElement } from '../lmd-sidebar-element';

describe('lmd-sidebar-element', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LmdSidebarElement],
      html: `<lmd-sidebar-element></lmd-sidebar-element>`,
    });
    expect(page.root).toEqualHtml(`
      <lmd-sidebar-element>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </lmd-sidebar-element>
    `);
  });
});
