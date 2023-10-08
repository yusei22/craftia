import type { Meta, StoryObj } from '@storybook/react';
import Typography from '.';

const meta = {
    title: 'Atoms/Typography',
    component: Typography,
    tags: ['autodocs'],
} satisfies Meta<typeof Typography>

export default meta;

type Story = StoryObj<typeof Typography>;

const longText = `It is a long established fact that a reader will be
distracted by the readable content of a page when looking at its layout.
The point of using Lorem Ipsum is that it has a more - or - less normal
distribution of letters, as opposed to using Content here, content here,
making it look like readable English.Many desktop publishing packages and
web page editors now use Lorem Ipsum as their default model text, and a
search for lorem ipsum will uncover many web sites still in their infancy.
Various versions have evolved over the years, sometimes by accident,
sometimes on purpose(injected humour and the like).`

export const ExtraSmall: Story = {
    args: {
        variant:'extraSmall',
        children:longText
    },
};
export const Small: Story = {
    args: {
        variant:'small',
        children:longText
    },
};

export const Medium: Story = {
    args: {
        variant:'medium',
        children:longText
    },
};

export const MediumLarge: Story = {
    args: {
        variant:'mediumLarge',
        children:longText
    },
};
export const Large: Story = {
    args: {
        variant:'large',
        children:longText
    },
};
export const ExtraLarge: Story = {
    args: {
        variant:'extraLarge',
        children:longText
    },
};
