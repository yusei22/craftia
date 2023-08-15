import type { Meta, StoryObj } from '@storybook/react';
import { useState } from '@storybook/addons'
import DraggableWindow from '.'
import Box from 'components/layout/Box'
import Button from 'components/atoms/Button';

const meta = {
    title: 'Molecules/DraggableWindow',
    component: DraggableWindow,
    tags: ['autodocs'],
    argTypes: {
        show: { type: 'boolean' },
        title: { type: 'string' },
        contentWidth: { type: 'string' },
        contentHeight: { type: 'string' },
    }
} satisfies Meta<typeof DraggableWindow>;

export default meta;
type Story = StoryObj<typeof DraggableWindow>;

export const Primary: Story = {
    args: {
        show: true,
        contentWidth: '500px',
        contentHeight: '300px',
        title: 'ウィンドウ',
    }
}
export const CloseOpen: Story = {
    render: () => {
        const [show, setShow] = useState(true)
        return (
            <>
                <Button onClick={() => { setShow(true) }}>open</Button>
                <DraggableWindow
                    show={show}
                    contentWidth={'500px'}
                    contentHeight={'300px'}
                    title={'ウィンドウ'}
                    onClose={() => { setShow(false) }}
                >
                    <Box $display={'block'} $height={'100%'} $backgroundColor={'foundation'}></Box>
                </DraggableWindow>
            </>

        )
    }
}