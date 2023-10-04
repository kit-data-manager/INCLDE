import { newSpecPage } from '@stencil/core/testing';
import { IncldeHelpSpot } from '../inclde-help-spot';

describe('inclde-help-spot', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IncldeHelpSpot],
      html: `<inclde-help-spot></inclde-help-spot>`,
    });
    expect(page.root).toEqualHtml(`
      <inclde-help-spot>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </inclde-help-spot>
    `);
  });
});
