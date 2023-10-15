import type { Meta, StoryObj } from '@storybook/react';
import Circle from '.';
import { Vec2 } from 'application/core/units';

const meta = {
    title: 'Atoms/Circle',
    component: Circle,
    tags: ['autodocs'],
} satisfies Meta<typeof Circle>;

export default meta;
type Story = StoryObj<typeof Circle>;

export const Primary: Story = {
    args: {
        radius: new Vec2(20, 20),
        location: new Vec2(0, 0),
    },
};
