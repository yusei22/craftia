import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { renderViewScaleAtom, } from 'dataflow';
import { useWindowSize } from 'hooks';

const RenderingAreaRoot = ({ children }: { children: React.ReactNode }) => {
    const setRenderViewScale = useSetRecoilState(renderViewScaleAtom);
    const windowSize = useWindowSize();

    useEffect(() => {
        setRenderViewScale(windowSize);
    }, [windowSize])
    return children;
}

export { RenderingAreaRoot }