import { newE2EPage } from '@stencil/core/testing';

describe('inclde-view-edit', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<inclde-view-edit></inclde-view-edit>');

    const element = await page.find('inclde-view-edit');
    expect(element).toHaveClass('hydrated');
  });
});
