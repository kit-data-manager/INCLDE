import { newSpecPage } from '@stencil/core/testing';
import { LmdInput } from '../lmd-input';

describe('lmd-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LmdInput],
      html: `<lmd-input></lmd-input>`,
    });
    expect(page.root).toEqualHtml(`
      <lmd-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </lmd-input>
    `);
  });
});
