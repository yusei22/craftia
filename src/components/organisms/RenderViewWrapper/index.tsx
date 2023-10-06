import { useGesture, useMove, usePinch, useScroll, useWheel } from "@use-gesture/react"
import { useRef } from "react"
import { RenderViewListeners } from "stores"

type RenderViewWrapperProps = {
    children?: React.ReactNode,
    events: RenderViewListeners
}

const RenderViewWrapper = ({ children, events }: RenderViewWrapperProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null)
    useGesture(events, { eventOptions: { passive: false }, target: wrapperRef })

    return (
        <div
            ref={wrapperRef}
            css={{
                display: 'flex',
                position: 'relative',
                height: '100%',
                width: 'fit-content',
                margin: '0px',
                padding: '0px',
                touchAction:'none'
            }}
        >
            {children}
        </div>
    )
}
export { RenderViewWrapper };