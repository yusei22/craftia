import type { Meta, StoryObj } from '@storybook/react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import NearMeIcon from '@mui/icons-material/NearMe';
import IconButton from '.';

const meta = {
    title: 'Atoms/IconButton',
    component: IconButton,
    tags: ['autodocs'],
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: <HighlightOffIcon />
    },
};
export const Danger: Story = {
    args: {
        variant: 'danger',
        children: <HighlightOffIcon />,
    },
};
export const translucent: Story ={
    args: {
        variant: 'translucent',
        children: <NearMeIcon />,
    },
}
