import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { LayerInfo } from 'application/types';
import React, { forwardRef } from 'react';
import { LayerPanel } from '../LayerPanel';
import Text from 'components/atoms/Text';
import Box from 'components/layout/Box';

const SortableLayerPanel = forwardRef(({ id, layer }: LayerInfo) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    return (
        <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <LayerPanel id={id} layer={layer}></LayerPanel>
        </Box>
    );
});
export { SortableLayerPanel };
