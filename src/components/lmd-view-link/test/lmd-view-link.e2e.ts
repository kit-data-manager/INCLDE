import { newE2EPage } from '@stencil/core/testing';

describe('lmd-view-link', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<lmd-view-link></lmd-view-link>');

    const element = await page.find('lmd-view-link');
    expect(element).toHaveClass('hydrated');
  });
});
