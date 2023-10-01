import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '.';

const meta = {
    title: 'Molecules/Header',
    component: Header,
    tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof Header>;

export const Primary: Story = {
    args: {},
};
