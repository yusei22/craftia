import type { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import { LayerTreeRoot } from '../LayerTreeRoot';
import { LayerColumn } from '.';

const meta = {
  title: 'organisms/Button',
  component: LayerColumn,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    ),
  ],
} satisfies Meta<typeof LayerColumn>;

export default meta;

type Story = StoryObj<typeof LayerColumn>;

export const Primary: Story = {
  render: () => {
    return (
      <>
        <LayerTreeRoot>
          <LayerColumn />
        </LayerTreeRoot>
      </>
    );
  },
};
