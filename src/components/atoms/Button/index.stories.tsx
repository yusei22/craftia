import type { Meta, StoryObj } from '@storybook/react';
import Button from './index';

const meta = {
    title: 'Atoms/Button',
    component: Button,
    tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;
export const Primary: Story = {
    args: {
        children: 'ボタン',
        $variant: 'primary',
    },
};

export const Warn: Story = {
    args: {
        children: '⚠警告',
        $variant: 'warn',
    },
};
export const Danger: Story = {
    args: {
        children: '危険！',
        $variant: 'danger',
    },
};
export const Dark: Story = {
    args: {
        children: 'ファイル',
        $variant: 'dark',
    },
};
