import { newE2EPage } from '@stencil/core/testing';

describe('inclde-view-link', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<inclde-view-link></inclde-view-link>');

    const element = await page.find('inclde-view-link');
    expect(element).toHaveClass('hydrated');
  });
});
