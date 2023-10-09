import { newE2EPage } from '@stencil/core/testing';

describe('inclde-add-node-dialogue', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<inclde-add-node-dialogue></inclde-add-node-dialogue>');

    const element = await page.find('inclde-add-node-dialogue');
    expect(element).toHaveClass('hydrated');
  });
});
