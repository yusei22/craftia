import { useGesture } from '@use-gesture/react';
import { useRef } from 'react';
import Wrapper from 'components/layout/Wrapper';
import { RenderViewListeners } from 'dataflow';
type RenderViewWrapperProps = {
    children?: React.ReactNode;
    events: RenderViewListeners;
};

const RenderViewWrapper = ({ children, events }: RenderViewWrapperProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    useGesture(
        {
            ...events,
            onWheel: () => {
                console.log('onwheel');
            },
            onPinch: () => {
                console.log('onPinch');
            },
        },
        { eventOptions: { passive: false }, target: wrapperRef }
    );
    console.log('RenderViewListeners : ', events);
    return (
        <Wrapper ref={wrapperRef} css={{ touchAction: 'none' }}>
            {children}
        </Wrapper>
    );
};
export { RenderViewWrapper };
