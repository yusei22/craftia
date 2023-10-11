import { useState } from '@storybook/addons';
import type { Meta, StoryObj } from '@storybook/react';
import Slider from '.';

const meta = {
    title: 'Molecules/Slider',
    component: Slider,
    tags: ['autodocs'],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof Slider>;

export const Primary: Story = {
    render: () => {
        const [value, setValue] = useState(50);
        return (
            <>
                <Slider
                    uniqueId='sampleSlider'
                    value={value}
                    setValue={setValue}
                    size={150}
                    label='Label'
                ></Slider>
            </>
        )
    }
};