import type { Meta, StoryObj } from '@storybook/react';
import RectBox from '.';
import { Vec2 } from 'application/core/units';

const meta = {
    title: 'Molecules/RectBox',
    component: RectBox,
    tags: ['autodocs'],
} satisfies Meta<typeof RectBox>;

export default meta;
type Story = StoryObj<typeof RectBox>;

export const Resizer: Story = {
    args: {
        topLeft: new Vec2(0, 0),
        bottomLeft: new Vec2(0, 200),
        topRight: new Vec2(100, 0),
        bottomRight: new Vec2(100, 100),
        resizeCursor: true,
        cornerCss: (theme) => ({
            ':hover': {
                backgroundColor: theme.colors.white,
                outline: ` ${theme.colors.primary400}  solid 2px`,
            },
            ':active': {
                backgroundColor: theme.colors.primary100,
                outline: ` ${theme.colors.primary400}  solid 2px`,
            },
            borderRadius: '10%',
        }),
    },
};

export const SkeletonBox: Story = {
    args: {
        topLeft: new Vec2(0, 0),
        bottomLeft: new Vec2(0, 100),
        topRight: new Vec2(100, 0),
        bottomRight: new Vec2(100, 100),
        borderWidth: 1,
        cornerRadius: new Vec2(0.5, 0.5),
        resizeCursor: false,
    },
};
