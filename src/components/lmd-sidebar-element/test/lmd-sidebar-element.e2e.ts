import { newE2EPage } from '@stencil/core/testing';

describe('lmd-sidebar-element', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<lmd-sidebar-element></lmd-sidebar-element>');

    const element = await page.find('lmd-sidebar-element');
    expect(element).toHaveClass('hydrated');
  });
});
