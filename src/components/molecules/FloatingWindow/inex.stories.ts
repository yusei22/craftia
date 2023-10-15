import type { Meta, StoryObj } from '@storybook/react';
import FloatingWindow from '.';

const meta = {
    title: 'Molecules/FloatingWindow',
    component: FloatingWindow,
    tags: ['autodocs'],
    argTypes: {
        show: { type: 'boolean' },
        title: { type: 'string' },
        width: { type: 'number' },
        height: { type: 'number' },
    },
} satisfies Meta<typeof FloatingWindow>;

export default meta;
type Story = StoryObj<typeof FloatingWindow>;

export const Primary: Story = {
    args: {
        width: 400,
        height: 300,
        title: 'ウィンドウ',
    },
};
