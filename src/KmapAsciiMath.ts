import {html, css, LitElement, property, PropertyValues, internalProperty} from 'lit-element';
import {unsafeHTML} from "lit-html/directives/unsafe-html";
import {math} from "./math.js";
import {katexStyles} from "./katex-css.js";

export class KmapAsciiMath extends LitElement {
  static styles = [css`
    :host {
      display: block;
      padding: 25px;
      color: var(--kmap-ascii-math-text-color, #000);
    }
  `, katexStyles];

  @property({ type: String }) term?: string;

  @internalProperty() _html?: string;

  protected update(_changedProperties: PropertyValues) {
    if (_changedProperties.has("term")) {
      const set = (value:string):void => { this._html = value };
      if (this.term)
      math(this.term, set);
      else
        this._html = "";
    }
    super.update(_changedProperties);
  }

  render() {
    return html`
      <div>${unsafeHTML(this._html)}</div>
    `;
  }
}
