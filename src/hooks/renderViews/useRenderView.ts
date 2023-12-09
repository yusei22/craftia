import { hexToRgba } from '@uiw/color-convert';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Vec4 } from 'application/core/units';
import { RenderView } from 'application/render/RenderView';
import { SpritesRenderer } from 'application/render/SpritesRenderer';
import {
    stageTransformAtom,
    stageResolutionAtom,
    spriteTreeAtom,
    renderViewScaleAtom,
} from 'dataflow';
import { themeAtom } from 'dataflow/themes/themeAtom';

export const useRenderView = (context: CanvasRenderingContext2D | null) => {
    const [renderView, setRenderView] = useState<RenderView | null>(null);
    const [stageRenderer, setStageRenderer] = useState<SpritesRenderer | null>(null);

    const stageTransform = useRecoilValue(stageTransformAtom);
    const stageResolution = useRecoilValue(stageResolutionAtom);

    const renderViewScale = useRecoilValue(renderViewScaleAtom);
    const sprites = useRecoilValue(spriteTreeAtom);

    const theme = useRecoilValue(themeAtom);

    const renderStageRendererResult = () => {
        if (stageRenderer === null) {
            return;
        }
        if (renderView === null) {
            return;
        }
        const rgba = hexToRgba(theme.colors.neutral100);
        renderView.viewport(renderViewScale);
        renderView.clear(new Vec4(rgba.r, rgba.g, rgba.b, rgba.a));
        renderView.clearRect(stageTransform);
        renderView.render(stageRenderer.getResult(), stageTransform);
    };

    useEffect(() => {
        if (context === null) return;
        setStageRenderer(new SpritesRenderer());
        setRenderView(new RenderView({ context }));
    }, [context]);

    useEffect(() => {
        if (stageRenderer === null) {
            return;
        }
        stageRenderer.viewport(stageResolution);
        stageRenderer.render(sprites);
        renderStageRendererResult();
    }, [sprites, stageRenderer, renderView]);

    useEffect(() => {
        renderStageRendererResult();
    }, [renderViewScale, stageTransform, stageResolution, stageRenderer, renderView, theme]);
};
