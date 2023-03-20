import { newE2EPage } from '@stencil/core/testing';

describe('lmd-sidebar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<lmd-sidebar></lmd-sidebar>');

    const element = await page.find('lmd-sidebar');
    expect(element).toHaveClass('hydrated');
  });
});
