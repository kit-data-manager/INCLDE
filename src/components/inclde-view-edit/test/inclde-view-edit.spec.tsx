import { newSpecPage } from '@stencil/core/testing';
import { IncldeViewEdit } from '../inclde-view-edit';

describe('inclde-view-edit', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IncldeViewEdit],
      html: `<inclde-view-edit></inclde-view-edit>`,
    });
    expect(page.root).toEqualHtml(`
      <inclde-view-edit>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </inclde-view-edit>
    `);
  });
});
