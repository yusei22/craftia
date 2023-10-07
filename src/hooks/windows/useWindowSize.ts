import { useLayoutEffect, useState } from 'react';

const useWindowSize = (): [number,number] => {
    const [size, setSize] = useState<[number, number]>([0, 0]);
    useLayoutEffect(() => {
        const updateSize = (): void => {
            setSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', updateSize);
        updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
};
export { useWindowSize };
