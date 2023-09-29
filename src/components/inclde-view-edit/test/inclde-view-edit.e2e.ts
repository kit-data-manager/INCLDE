import { newE2EPage } from '@stencil/core/testing';

describe('lmd-view-edit', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<lmd-view-edit></lmd-view-edit>');

    const element = await page.find('lmd-view-edit');
    expect(element).toHaveClass('hydrated');
  });
});
