import type { Meta, StoryObj } from '@storybook/react';
import { useState } from '@storybook/addons'
import DraggableWindow from '.'
import Box from 'components/layout/Box'
import Button from 'components/atoms/Button';

const meta = {
    title: 'Molecules/DraggableWindow',
    component: DraggableWindow,
    tags: ['autodocs'],
} satisfies Meta<typeof DraggableWindow>;

export default meta;
type Story = StoryObj<typeof DraggableWindow>;
export const Green: Story = {
    render: () => {
        const [show, setShow] = useState(true)
        return (
            <>
                <Button onClick={() => { setShow(true) }}>open</Button>
                <DraggableWindow
                    show={show}
                    width={'500px'}
                    headerHeight={'30px'}
                    headerColor={'secondary'}
                    title={'ウィンドウ'}
                    titleColor={'white'}
                    closeIconColor={'white'}
                    onClose={() => { setShow(false) }}
                >
                    <Box $display={'block'} $height={'300px'} $backgroundColor={'foundation'}></Box>
                </DraggableWindow>
            </>

        )
    }
}