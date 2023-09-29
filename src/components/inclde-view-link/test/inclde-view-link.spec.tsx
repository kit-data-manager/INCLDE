import { newSpecPage } from '@stencil/core/testing';
import { IncldeViewLink } from '../inclde-view-link';

describe('inclde-view-link', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IncldeViewLink],
      html: `<inclde-view-link></inclde-view-link>`,
    });
    expect(page.root).toEqualHtml(`
      <inclde-view-link>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </inclde-view-link>
    `);
  });
});
