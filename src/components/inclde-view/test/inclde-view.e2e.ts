import { newE2EPage } from '@stencil/core/testing';

describe('inclde-view', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<inclde-view></inclde-view>');

    const element = await page.find('inclde-view');
    expect(element).toHaveClass('hydrated');
  });
});
