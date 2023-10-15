import type { Meta, StoryObj } from '@storybook/react';
import DiagonalLine from '.';
import { Vec2 } from 'application/core/units';

const meta = {
    title: 'Atoms/DiagonalLine',
    component: DiagonalLine,
    tags: ['autodocs'],
} satisfies Meta<typeof DiagonalLine>;

export default meta;
type Story = StoryObj<typeof DiagonalLine>;

export const Primary: Story = {
    args: {
        start: new Vec2(0, 0),
        end: new Vec2(100, 23),
    },
};
