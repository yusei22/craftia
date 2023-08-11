import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from '.';

const meta = {
    title: 'Atoms/NumberInput',
    component: NumberInput,
    tags: ['autodocs'],
} satisfies Meta<typeof NumberInput>;

export default meta;

type Story = StoryObj<typeof NumberInput>
export const Primary: Story = {
    render: () => {
        return (
            <>
                <NumberInput value={10} defaultValue={10}></NumberInput>
            </>
        )
    }
}