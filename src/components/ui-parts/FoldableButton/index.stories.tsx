import ColorLensIcon from '@mui/icons-material/ColorLens';
import { useState } from '@storybook/addons';
import type { Meta, StoryObj } from '@storybook/react';
import FoldableButton from '.';
import { theme } from 'themes';

const meta = {
    title: 'Molecules/FoldableButton',
    component: FoldableButton,
    tags: ['autodocs'],
    argTypes: {
        text: { type: 'string' },
        isActive: { type: 'boolean' },
    },
} satisfies Meta<typeof FoldableButton>;

export default meta;

type Story = StoryObj<typeof FoldableButton>;

export const Active: Story = {
    args: {
        icon: (
            <>
                <ColorLensIcon sx={{ color: theme.colors['white'] }} fontSize="small" />
            </>
        ),
        text: '描画',
        height: 30,
        heightMobile: 28,
        paddingSide: 15,
        paddingSideMobile: 8,
        isActive: true,
    },
};
export const NotActive: Story = {
    args: {
        icon: (
            <>
                <ColorLensIcon sx={{ color: theme.colors['text'] }} fontSize="small" />
            </>
        ),
        text: '描画',
        isActive: false,
    },
};
export const Switchable: Story = {
    render: () => {
        const [isActive, setIsActive] = useState(false);
        return (
            <>
                <FoldableButton
                    icon={
                        <ColorLensIcon
                            sx={{
                                color: isActive ? theme.colors['white'] : theme.colors['text'],
                            }}
                            fontSize="small"
                        />
                    }
                    text="描画"
                    isActive={isActive}
                    onClick={(e) => {
                        isActive ? setIsActive(false) : setIsActive(true);
                    }}
                />
            </>
        );
    },
};
