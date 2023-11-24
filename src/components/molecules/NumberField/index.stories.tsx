import { useState } from '@storybook/addons';
import type { Meta, StoryObj } from '@storybook/react';
import { NumberField } from '.';

const meta = {
    title: 'Molecules/Slider',
    component: NumberField,
    tags: ['autodocs'],
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof NumberField>;

export const Primary: Story = {
    render: () => {
        const [value, setValue] = useState(50);// eslint-disable-line
        return (
            <>
                <NumberField
                    id="sampleSlider"
                    value={value}
                    setValue={setValue}
                    label="Label"
                ></NumberField>
            </>
        );
    },
};
