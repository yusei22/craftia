import type { Meta, StoryObj } from '@storybook/react';
import Label from '.';

const meta = {
    title: 'Atoms/Label',
    component: Label,
    tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof Label>;

export const Small: Story = {
    args: {
        children: 'Small',
        size: 'sm',
    },
};
export const Medium: Story = {
    args: {
        children: 'Medium',
        size: 'md',
    },
};
export const Large: Story = {
    args: {
        children: 'Large',
        size: 'lg',
    },
};
