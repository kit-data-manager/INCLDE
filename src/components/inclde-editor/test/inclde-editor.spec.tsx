import { newSpecPage } from '@stencil/core/testing';
import { IncldeEditor } from '../inclde-editor';

describe('inclde-editor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IncldeEditor],
      html: `<inclde-editor></inclde-editor>`,
    });
    expect(page.root).toEqualHtml(`
      <inclde-editor>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </inclde-editor>
    `);
  });
});
