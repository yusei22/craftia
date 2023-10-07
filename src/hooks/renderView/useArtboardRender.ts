import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Vec2 } from 'application/core/units';
import { RenderView } from 'application/render/RenderView';
import { SpritesRenderer } from 'application/render/SpritesRenderer';
import {
    artboardTransformAtom,
    artboardResolutionAtom,
    spriteTreeAtom,
    renderViewScaleAtom,
} from 'dataflow';

const useRenderViewRender = () => {

    const [renderViewCanvasUpdateCount, setRenderViewCanvasUpdateCount] = useState<number>(0);
    const [renderViewCanvas, setRenderViewCanvas] = useState<HTMLCanvasElement | null>(null);

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
        const { anchor, location, scale, rotation } = artboardTransform;
        
        renderView.viewport(new Vec2(renderViewScale));
        renderView.render(artboardRenderer.getResult(), {
            anchor: new Vec2(anchor),
            location: new Vec2(location),
            rotate: rotation,
            scale: new Vec2(scale),
        });


        setRenderViewCanvasUpdateCount((value) => value + 1);
    }

    useEffect(() => {
        setArtboardRenderer(new SpritesRenderer());
        setRenderView(new RenderView());
    }, []);

    useEffect(() => {
        if (artboardRenderer === null) {
            return;
        }
        artboardRenderer.viewport(new Vec2(artboardResolution));
        artboardRenderer.render(sprites);
        renderArtboardRendererResult();
    }, [
        sprites,
        artboardRenderer,
        renderView
    ]);
    useEffect(() => {
        renderArtboardRendererResult();
    }, [
        renderViewScale,
        artboardTransform,
        artboardResolution,
        artboardRenderer,
        renderView
    ])
    useEffect(() => {
        if (renderView === null) {
            return;
        }
        setRenderViewCanvas(renderView.getCanvas())
    }, [renderView])
    return { source: renderViewCanvas, deps: [renderViewCanvas, renderViewCanvasUpdateCount] };
}

export default useRenderViewRender;