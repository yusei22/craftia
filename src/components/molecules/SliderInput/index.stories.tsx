import type { Meta, StoryObj } from '@storybook/react';
import { useState } from '@storybook/addons'
import SliderInput from '.';
import DraggableWindow from '../DraggableWindow';
import Box from 'components/layout/Box';

const meta = {
    title: 'Molecules/SliderInput',
    component: SliderInput,
    tags: ['autodocs'],
} satisfies Meta<typeof SliderInput>;

export default meta;
type Story = StoryObj<typeof SliderInput>;

export const Primary: Story = {
    render: () => {
        const [value, setValue] = useState(0)
        return (
            <>
                <SliderInput
                    value={value}
                    id='numInput'
                    title='半径：'
                    setValue={setValue}
                    defaultValue={0}
                    min={0}
                    max={100}
                    sliderSize={{ base: '160px', md: '200px' }}
                ></SliderInput>
            </>
        )
    }
}
export const Draggable: Story = {
    render: () => {
        const [value, setValue] = useState(10)
        return (
            <>
                <DraggableWindow show={true} contentWidth={{ base: '200px', md: '400px' }}  title='ガウスぼかし'>
                    <Box $padding={'15px'}>
                        <SliderInput
                            value={value}
                            id='numInput'
                            title='半径：'
                            setValue={setValue}
                            defaultValue={0}
                            min={0}
                            max={100}
                            sliderSize={{ base: '160px', md: '200px' }}
                        ></SliderInput>
                    </Box>
                </DraggableWindow>

            </>
        )
    }
}
