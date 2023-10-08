import type { Meta, StoryObj } from '@storybook/react';
import Button from '.';

const meta = {
    title: 'Molecules/DraggableWindow',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        variant: { type: 'string' },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'ボタン',
    },
};
export const Danger: Story = {
    args: {
        variant: 'danger',
        children: 'ボタン',
    },
};
