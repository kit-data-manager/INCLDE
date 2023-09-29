import { newE2EPage } from '@stencil/core/testing';

describe('inclde-sidebar-element', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<inclde-sidebar-element></inclde-sidebar-element>');

    const element = await page.find('inclde-sidebar-element');
    expect(element).toHaveClass('hydrated');
  });
});
