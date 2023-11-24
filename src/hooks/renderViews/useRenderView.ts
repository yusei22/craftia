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

export const useRenderView = (context: CanvasRenderingContext2D | null) => {
    const [renderView, setRenderView] = useState<RenderView | null>(null);
    const [stageRenderer, setStageRenderer] = useState<SpritesRenderer | null>(null);

    const stageTransform = useRecoilValue(stageTransformAtom);
    const stageResolution = useRecoilValue(stageResolutionAtom);

    const renderViewScale = useRecoilValue(renderViewScaleAtom);
    const sprites = useRecoilValue(spriteTreeAtom);

    const renderStageRendererResult = () => {
        if (stageRenderer === null) {
            return;
        }
        if (renderView === null) {
            return;
        }
        renderView.viewport(renderViewScale);
        renderView.clear(new Vec4(249, 249, 249, 1));
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
    }, [renderViewScale, stageTransform, stageResolution, stageRenderer, renderView]);
};
