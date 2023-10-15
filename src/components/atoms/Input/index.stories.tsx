import type { Meta, StoryObj } from '@storybook/react';

import Input from '.';

const meta = {
    title: 'Atoms/Input',
    component: Input,
    tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Number: Story = {
    args: {
        type: 'number',
    },
};

export const Text: Story = {
    args: {
        type: 'text',
    },
};
