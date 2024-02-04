import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import Button from './Button';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    children: {
      type: 'string',
    },
    Icon: {
      control: {
        type: null,
      },
    },
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = args => <Button {...args} />;

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  children: 'Button text',
};

export const IconButton = Template.bind({});
IconButton.args = {
  type: 'icon',
  Icon: PlusOutlined,
};
