import type { Meta, StoryObj } from '@storybook/react';
import Button from './index'

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;
export const Primary: Story={
  args:{
    children:'Primary',
    $variant:'primary'
  }
}

