import { newSpecPage } from '@stencil/core/testing';
import { LmdEditor } from '../lmd-editor';

describe('lmd-editor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LmdEditor],
      html: `<lmd-editor></lmd-editor>`,
    });
    expect(page.root).toEqualHtml(`
      <lmd-editor>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </lmd-editor>
    `);
  });
});
