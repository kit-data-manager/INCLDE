import { newSpecPage } from '@stencil/core/testing';
import { IncldeAddNodeDialogue } from '../inclde-add-node-dialogue';

describe('inclde-add-node-dialogue', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IncldeAddNodeDialogue],
      html: `<inclde-add-node-dialogue></inclde-add-node-dialogue>`,
    });
    expect(page.root).toEqualHtml(`
      <inclde-add-node-dialogue>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </inclde-add-node-dialogue>
    `);
  });
});
