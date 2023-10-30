import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { RenderView } from 'application/render/RenderView';
import { SpritesRenderer } from 'application/render/SpritesRenderer';
import {
    artboardTransformAtom,
    artboardResolutionAtom,
    spriteTreeAtom,
    renderViewScaleAtom,
} from 'dataflow';

export const useRenderView = (context: CanvasRenderingContext2D | null) => {
    const [renderView, setRenderView] = useState<RenderView | null>(null);
    const [artboardRenderer, setArtboardRenderer] = useState<SpritesRenderer | null>(null);

    const artboardTransform = useRecoilValue(artboardTransformAtom);
    const artboardResolution = useRecoilValue(artboardResolutionAtom);

    const renderViewScale = useRecoilValue(renderViewScaleAtom);
    const sprites = useRecoilValue(spriteTreeAtom);

    const renderArtboardRendererResult = () => {
        if (artboardRenderer === null) {
            return;
        }
        if (renderView === null) {
            return;
        }
        renderView.viewport(renderViewScale);
        renderView.clear();
        renderView.clearRect(artboardTransform);
        renderView.render(artboardRenderer.getResult(), artboardTransform);
    };

    useEffect(() => {
        if (context === null) return;
        setArtboardRenderer(new SpritesRenderer());
        setRenderView(new RenderView({ context }));
    }, [context]);

    useEffect(() => {
        if (artboardRenderer === null) {
            return;
        }
        artboardRenderer.viewport(artboardResolution);
        artboardRenderer.render(sprites);
        renderArtboardRendererResult();
    }, [sprites, artboardRenderer, renderView]);

    useEffect(() => {
        renderArtboardRendererResult();
    }, [renderViewScale, artboardTransform, artboardResolution, artboardRenderer, renderView]);
};
