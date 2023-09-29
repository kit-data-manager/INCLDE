import { newE2EPage } from '@stencil/core/testing';

describe('inclde-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<inclde-editor></inclde-editor>');

    const element = await page.find('inclde-editor');
    expect(element).toHaveClass('hydrated');
  });
});
