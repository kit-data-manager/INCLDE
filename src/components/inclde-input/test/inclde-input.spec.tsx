import { newSpecPage } from '@stencil/core/testing';
import { IncldeInput } from '../inclde-input';

describe('inclde-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IncldeInput],
      html: `<inclde-input></inclde-input>`,
    });
    expect(page.root).toEqualHtml(`
      <inclde-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </inclde-input>
    `);
  });
});
