import { useGesture } from '@use-gesture/react';
import { useRef } from 'react';
import Wrapper from 'components/layout/Wrapper';
import { RenderViewListeners } from 'dataflow';
type RenderViewWrapperProps = {
    children?: React.ReactNode;
    events: RenderViewListeners;
};

const RenderViewWrapper = ({ children, events }: RenderViewWrapperProps) => {
    console.log(events);
    const wrapperRef = useRef<HTMLDivElement>(null);
    useGesture(events, { eventOptions: { passive: false }, target: wrapperRef });

    return (
        <Wrapper ref={wrapperRef} css={{ touchAction: 'none' }}>
            {children}
        </Wrapper>
    );
};
export { RenderViewWrapper };
