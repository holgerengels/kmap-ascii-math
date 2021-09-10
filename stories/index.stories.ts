import { html, TemplateResult } from 'lit';
import '../src/kmap-ascii-math.js';

export default {
  title: 'KmapAsciiMath',
  component: 'kmap-ascii-math',
  argTypes: {
    title: { control: 'text' },
    counter: { control: 'number' },
    textColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  title?: string;
  counter?: number;
  textColor?: string;
  slot?: TemplateResult;
}

const Template: Story<ArgTypes> = ({
  title = 'Hello world',
  counter = 5,
  textColor,
  slot,
}: ArgTypes) => html`
  <kmap-ascii-math
    style="--kmap-ascii-math-text-color: ${textColor || 'black'}"
    .title=${title}
    .counter=${counter}
  >
    ${slot}
  </kmap-ascii-math>
`;

export const Regular = Template.bind({});

export const CustomTitle = Template.bind({});
CustomTitle.args = {
  title: 'My title',
};

export const CustomCounter = Template.bind({});
CustomCounter.args = {
  counter: 123456,
};

export const SlottedContent = Template.bind({});
SlottedContent.args = {
  slot: html`<p>Slotted content</p>`,
};
SlottedContent.argTypes = {
  slot: { table: { disable: true } },
};
