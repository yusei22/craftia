import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { Vec2 } from 'application/core/units';
import { renderViewScaleAtom } from 'dataflow';
import { useWindowSize } from 'hooks';

export const RenderViewSizeProvider = ({ children }: { children?: React.ReactNode }) => {
    const setRenderViewScale = useSetRecoilState(renderViewScaleAtom);
    const windowSize = useWindowSize();

    useEffect(() => {
        setRenderViewScale(new Vec2(windowSize).floor());
    }, [windowSize]);

    return children;
};
