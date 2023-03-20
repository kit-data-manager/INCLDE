import { newE2EPage } from '@stencil/core/testing';

describe('lmd-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<lmd-editor></lmd-editor>');

    const element = await page.find('lmd-editor');
    expect(element).toHaveClass('hydrated');
  });
});
