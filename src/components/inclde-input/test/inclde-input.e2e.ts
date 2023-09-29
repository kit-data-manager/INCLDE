import { newE2EPage } from '@stencil/core/testing';

describe('inclde-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<inclde-input></inclde-input>');

    const element = await page.find('inclde-input');
    expect(element).toHaveClass('hydrated');
  });
});
