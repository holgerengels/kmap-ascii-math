import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { KmapAsciiMath } from '../src/KmapAsciiMath.js';
import '../src/kmap-ascii-math.js';

describe('KmapAsciiMath', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture<KmapAsciiMath>(html`<kmap-ascii-math></kmap-ascii-math>`);

    expect(el.term).to.equal('Hey there');
  });

  it('can override the title via attribute', async () => {
    const el = await fixture<KmapAsciiMath>(html`<kmap-ascii-math title="attribute title"></kmap-ascii-math>`);

    expect(el.term).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<KmapAsciiMath>(html`<kmap-ascii-math></kmap-ascii-math>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
