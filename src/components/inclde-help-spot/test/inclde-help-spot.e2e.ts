import { newE2EPage } from '@stencil/core/testing';

describe('inclde-help-spot', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<inclde-help-spot></inclde-help-spot>');

    const element = await page.find('inclde-help-spot');
    expect(element).toHaveClass('hydrated');
  });
});
