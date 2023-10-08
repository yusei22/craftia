import type { Meta, StoryObj } from '@storybook/react';
import Button from '.';

const meta = {
    title: 'Atoms/Button',
    component: Button,
    tags: ['autodocs'],
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
export const Warn: Story = {
    args: {
        variant: 'warn',
        children: 'ボタン',
    },
};
export const translucent: Story ={
    args: {
        variant: 'translucent',
        children: 'ボタン',
    },
}
