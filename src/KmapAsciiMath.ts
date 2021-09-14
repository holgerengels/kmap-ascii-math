import {html, css, LitElement, property, PropertyValues, internalProperty, unsafeCSS, svg} from 'lit-element';
import {unsafeHTML} from "lit-html/directives/unsafe-html";
import {math} from "./math.js";
import {katexStyles} from "./katex-css.js";

export class KmapAsciiMath extends LitElement {
  // language=CSS
  static styles = [css`
    :host {
      display: inline-block;
      padding: 25px;
      color: var(--kmap-ascii-math-text-color, #000);
    }
    #math {
      display: inline-block;
    }
    #hover {
      display: flex;
      position: absolute;
      top: calc(50% - 22px);
      left: calc(50% - 22px);
      opacity: .0;
      transition: opacity 0.3s ease-in-out;
      background: white;
      padding: 8px;
      border: 2px solid lightgray;
      border-radius: 50%;
    }
    #hover svg {
      fill: lightgray;
    }
    :hover > #hover {
      opacity: 1;
    }
    #image {
      position: absolute;
      visibility: hidden;
    }
  `, katexStyles];

  static iconCopy = svg`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>`;

  @property({ type: String }) expression?: string;

  @internalProperty() _html?: string;

  createRenderRoot() {
    return this;
  }

  protected update(_changedProperties: PropertyValues) {
    if (_changedProperties.has("expression")) {
      const set = (value:string):void => { this._html = value };
      if (this.expression)
      math(this.expression, set);
      else
        this._html = "";
    }
    super.update(_changedProperties);
  }

  protected async updated(_changedProperties: PropertyValues) {
    if (_changedProperties.has("expression")) {
      await this.updateComplete;
      const div = this.renderRoot.querySelector("#math") as HTMLElement;
      const svge = this.renderRoot.querySelector("#svg") as SVGElement;
      svge.style.width = (div.offsetWidth + 2) + "px";
      svge.style.height = (div.offsetHeight + 2) + "px";
    }
  }

  render() {
    return html`
      <div style="position: relative; display: inline-block">
      <svg id="svg">
        <foreignObject id="object" height="100%" width="100%">
          <style>${KmapAsciiMath.styles}</style>
          <div id="math">${unsafeHTML(this._html)}</div>
        </foreignObject>
      </svg>
      <div id="hover" @click="${this._downloadPNG}">${KmapAsciiMath.iconCopy}</div>
      <img id="image" alt="no"/>
      </div>
    `;
  }

  _downloadPNG() {
    const div = this.renderRoot.querySelector("#math") as HTMLElement;
    const svge = this.renderRoot.querySelector("#svg") as SVGElement;
    const target = this.renderRoot.querySelector("#image") as HTMLImageElement;

    target.style.width = (div.offsetWidth + 2) + "px";
    target.style.height = (div.offsetHeight + 2) + "px";
    svge.style.width = (div.offsetWidth + 2) + "px";
    svge.style.height = (div.offsetHeight + 2) + "px";

    target.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = (div.offsetWidth + 2);
      canvas.height = (div.offsetHeight + 2);
      const context = canvas.getContext('2d');
      // @ts-ignore
      context.drawImage( target, 0, 0, target.width, target.height );
      canvas.toBlob((blob) => {
        // @ts-ignore
        // eslint-disable-next-line no-undef
        const data = [new ClipboardItem({ [blob.type]: blob })];
        navigator.clipboard.write(data);
      });
    };

    const svgAsXML = (new XMLSerializer).serializeToString(svge);
    target.src = `data:image/svg+xml,${ encodeURIComponent(svgAsXML)}`;
  }
}
