import { newE2EPage } from '@stencil/core/testing';

describe('inclde-sidebar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<inclde-sidebar></inclde-sidebar>');

    const element = await page.find('inclde-sidebar');
    expect(element).toHaveClass('hydrated');
  });
});
