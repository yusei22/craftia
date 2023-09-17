import type { Meta, StoryObj } from '@storybook/react';
import Text from './index';

const meta = {
    title: 'Atoms/Text',
    component: Text,
    tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof Text>;

const longText = `It is a long established fact that a reader will be
distracted by the readable content of a page when looking at its layout.
The point of using Lorem Ipsum is that it has a more - or - less normal
distribution of letters, as opposed to using Content here, content here,
making it look like readable English.Many desktop publishing packages and
web page editors now use Lorem Ipsum as their default model text, and a
search for lorem ipsum will uncover many web sites still in their infancy.
Various versions have evolved over the years, sometimes by accident,
sometimes on purpose(injected humour and the like).`;

export const ExtraSmall: Story = {
    args: {
        children: longText,
        $variant: 'extraSmall',
    },
};
export const Small: Story = {
    args: {
        children: longText,
        $variant: 'small',
    },
};

export const Medium: Story = {
    args: {
        children: longText,
        $variant: 'medium',
    },
};
export const MediumLarge: Story = {
    args: {
        children: longText,
        $variant: 'mediumLarge',
    },
};

export const Large: Story = {
    args: {
        children: longText,
        $variant: 'large',
    },
};

export const ExtraLarge: Story = {
    args: {
        children: longText,
        $variant: 'extraLarge',
    },
};
