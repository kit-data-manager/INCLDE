import { newE2EPage } from '@stencil/core/testing';

describe('lmd-view', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<lmd-view></lmd-view>');

    const element = await page.find('lmd-view');
    expect(element).toHaveClass('hydrated');
  });
});
