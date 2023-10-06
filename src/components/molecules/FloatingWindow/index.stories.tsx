import { useState } from '@storybook/addons';
import type { Meta, StoryObj } from '@storybook/react';
import FloatingWindow from '.';
import { Box } from '@mui/joy';

const meta = {
    title: 'Molecules/DraggableWindow',
    component: FloatingWindow,
    tags: ['autodocs'],
    argTypes: {
        show: { type: 'boolean' },
        title: { type: 'string' },
    },
} satisfies Meta<typeof FloatingWindow>;

export default meta;
type Story = StoryObj<typeof FloatingWindow>;

export const Primary: Story = {
    args: {
        show: true,
        title: 'ウィンドウ',
        children: <Box>ウィンドウ</Box>,
        width:1000,
        height:800
    },
};
export const CloseOpen: Story = {
    render: () => {
        return (
            <>
                <FloatingWindow show={true} title='ウィンドウ'>
                    ウィンドウ
                </FloatingWindow>
            </>
        );
    },
};