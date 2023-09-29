import { newE2EPage } from '@stencil/core/testing';

describe('lmd-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<lmd-input></lmd-input>');

    const element = await page.find('lmd-input');
    expect(element).toHaveClass('hydrated');
  });
});
