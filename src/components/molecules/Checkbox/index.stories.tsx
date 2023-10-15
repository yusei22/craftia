import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from '.';

const meta = {
    title: 'Molecules/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Medium: Story = {
    args: {
        uniqueId: 'MediumCheckBox',
        label: 'Medium',
    },
};
export const Small: Story = {
    args: {
        uniqueId: 'SmallCheckBox',
        label: 'Small',
        size: 'sm',
    },
};
export const Large: Story = {
    args: {
        uniqueId: 'MediumCheckBox',
        label: 'Large',
        size: 'lg',
    },
};
