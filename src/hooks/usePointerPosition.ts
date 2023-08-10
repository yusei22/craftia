import { useEffect, useState } from "react";
type position = {
    x: number,
    y: number
}
const usePointerPosition = (): position => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.pageX, y: e.pageY });
        }
        const handleTouchMove = (e: TouchEvent) => {
            setPosition({ x: e.touches[0].pageX, y: e.touches[0].pageY });
        }
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('touchmove', handleTouchMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('touchmove', handleTouchMove);
        }
    }, [])

    return position;
}
export default usePointerPosition;