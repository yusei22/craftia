import React, { useState } from 'react'
import { usePointerPosition } from 'hooks';
type DragzineProps = {
    handleDragStart: (pageCoord: PageCoord) => any;
    handleDragMove: (pageCoord: PageCoord) => any;
    handleDragEnd: (pageCoord: PageCoord) => any;
}
type PageCoord = {
    x: number;
    y: number;
};
const PointerDragzone = (props: DragzineProps) => {
    const [clicking, setClicking] = useState(false);
    const position = usePointerPosition();
    const handlePointerDown = () => {
        setClicking(true);
        props.handleDragStart(position)
    }
    const handlePointerMove = () => {
        if (clicking) props.handleDragMove(position)
    }
    const handlePointerEnd = () => {
        setClicking(false);
        props.handleDragEnd(position)
    }
    return (
        <div onMouseDown={handlePointerDown} onMouseMove={handlePointerMove} onMouseUp={handlePointerEnd}
            onTouchStart={handlePointerDown} onTouchMove={handlePointerMove} onTouchEnd={handlePointerEnd}></div>
    )
}
export default PointerDragzone;