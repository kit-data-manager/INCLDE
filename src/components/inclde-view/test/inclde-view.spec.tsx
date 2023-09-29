import { newSpecPage } from '@stencil/core/testing';
import { IncldeView } from '../inclde-view';

describe('inclde-view', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IncldeView],
      html: `<inclde-view></inclde-view>`,
    });
    expect(page.root).toEqualHtml(`
      <inclde-view>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </inclde-view>
    `);
  });
});
