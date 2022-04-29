import katex from 'katex';
// @ts-ignore
import AsciiMathParser from 'asciimath2tex';

const parser = new AsciiMathParser();

// ″
export function math(ascii: string, setter: (arg0: string) => void) {
  let display = false
  if (ascii.startsWith("\\display\\")) {
    ascii = ascii.substr("\\display\\".length);
    display = true;
  }
  let tex = parser.parse(ascii);
  tex = tex.replace(/\\color/g, "\\textcolor");
  if (display)
    tex = `\\displaystyle ${tex}`;
  const html = katex.renderToString(tex, { output: "html", throwOnError: false, trust: true, displayMode: false });
  // buffer += math;
  setter(`<span style='display: none'>${tex}</span>${html}`);
}
