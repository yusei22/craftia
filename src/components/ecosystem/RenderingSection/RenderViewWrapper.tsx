import { useDrag, useMove, usePinch, useWheel } from '@use-gesture/react';
import { useRef } from 'react';
import { RenderViewListeners } from 'dataflow';
import { CheckerBoard } from 'components/atoms/CheckerBoard';
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

    return (
        <CheckerBoard
            ref={wrapperRef}
            css={{
                touchAction: 'none',
            }}
        >
            {children}
        </CheckerBoard>
    );
};
export { RenderViewWrapper };
