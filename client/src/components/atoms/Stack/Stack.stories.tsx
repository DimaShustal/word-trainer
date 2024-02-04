import React from 'react';
import { Meta } from '@storybook/react';
import Stack from './Stack';
import Typography from '../Typography';

export default {
  title: 'Stack',
  component: Stack,
} as Meta<typeof Stack>;

export const Default = ({ ...args }) => (
  <Stack {...args}>
    <Typography style={{ background: 'grey', padding: '10px' }}>Line 1</Typography>
    <Typography style={{ background: 'grey', padding: '10px' }}>Line 2</Typography>
    <Typography style={{ background: 'grey', padding: '10px' }}>Line 3</Typography>
  </Stack>
);
