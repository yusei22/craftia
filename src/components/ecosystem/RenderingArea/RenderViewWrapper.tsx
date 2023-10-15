import { useDrag, useMove, usePinch, useWheel } from '@use-gesture/react';
import { useRef } from 'react';
import Wrapper from 'components/layout/Wrapper';
import { RenderViewListeners } from 'dataflow';
type RenderViewWrapperProps = {
    children?: React.ReactNode;
    events: RenderViewListeners;
};

const RenderViewWrapper = ({ children, events }: RenderViewWrapperProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useDrag(events.onDrag, { eventOptions: { passive: false }, target: wrapperRef });
    usePinch(events.onPinch, { eventOptions: { passive: false }, target: wrapperRef });
    useWheel(events.onWheel, { eventOptions: { passive: false }, target: wrapperRef });
    useMove(events.onMove, { eventOptions: { passive: false }, target: wrapperRef });

    console.log('RenderViewListeners : ', events);
    return (
        <Wrapper css={{ touchAction: 'none' }} ref={wrapperRef}>
            {children}
        </Wrapper>
    );
};
export { RenderViewWrapper };
