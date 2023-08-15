import type { Meta, StoryObj } from '@storybook/react';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { useState } from '@storybook/addons'
import { theme } from 'themes'
import FoldableButton from '.';

const meta = {
    title: 'Molecules/FoldableButton',
    component: FoldableButton,
    tags: ['autodocs'],
    argTypes: {
        text: { type: 'string' },
        isActive: { type: 'boolean' }
    }
} satisfies Meta<typeof FoldableButton>;

export default meta;

type Story = StoryObj<typeof FoldableButton>;

export const Active: Story = {
    args: {
        icon: <><ColorLensIcon sx={{ color: theme.colors['white'] }} /></>,
        height: 40,
        text: '描画',
        isActive: true
    }
}
export const NotActive: Story = {
    args: {
        icon: <><ColorLensIcon sx={{ color: theme.colors['text'] }} /></>,
        height: 40,
        text: '描画',
        isActive: false
    }
}
export const Switchable: Story = {
    render: () => {
        const [isActive, setIsActive] = useState(false)
        return (
            <>
                <FoldableButton
                    height={40}
                    icon={<ColorLensIcon sx={{ color: isActive ? theme.colors['white'] : theme.colors['text'] }} />}
                    text='描画'
                    isActive={isActive}
                    onClick={(e) => {
                        isActive ? setIsActive(false) : setIsActive(true)
                    }}
                />
            </>
        )
    }
}