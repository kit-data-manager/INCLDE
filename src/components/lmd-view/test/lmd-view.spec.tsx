import { newSpecPage } from '@stencil/core/testing';
import { LmdView } from '../lmd-view';

describe('lmd-view', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LmdView],
      html: `<lmd-view></lmd-view>`,
    });
    expect(page.root).toEqualHtml(`
      <lmd-view>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </lmd-view>
    `);
  });
});
