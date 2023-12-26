import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Typography from './Typography';
import TypographyMDX from './Typography.mdx';

export default {
  title: 'Typography',
  component: Typography,
  argTypes: {
    fontWeight: {
      options: [100, 300, 400, 500, 600, 700, 900],
      control: { type: 'select' },
    },
  },
  parameters: {
    docs: {
      page: TypographyMDX,
    },
  },
} as Meta<typeof Typography>;

const Template: StoryFn<typeof Typography> = args => <Typography {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Your text',
};
