import { html, TemplateResult } from 'lit-element';
import '../src/kmap-ascii-math.js';

export default {
  title: 'KmapAsciiMath',
  component: 'kmap-ascii-math',
  argTypes: {
    expression: { control: 'text' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  expression?: string;
}

const Template: Story<ArgTypes> = ({
  expression = '\\display\\e = lim_(n->oo)(1+1/n)^n',
}: ArgTypes) => html`
  <kmap-ascii-math
    .expression=${expression}
  >
  </kmap-ascii-math>
`;

export const Regular = Template.bind({});

export const CustomExpression = Template.bind({});
CustomExpression.args = {
  expression: 'e = lim_(n->oo)(1+1/n)^n',
};
