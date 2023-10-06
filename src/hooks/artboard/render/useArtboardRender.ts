import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Vec2 } from 'application/core/units';
import { RenderView } from 'application/render/RenderView';
import { SpritesRenderer } from 'application/render/SpritesRenderer';
import {
    ArtboardRotationAtom,
    ArtboardLocationAtom,
    ArtboardScaleAtom,
    SpriteTreeAtom,
    ArtboardResolutionAtom,
    ArtboardAnchorAtom,
    RenderViewScaleAtom,
} from 'stores';

const useArtboardRender = () => {

    const [renderViewCanvasUpdateCount, setRenderViewCanvasUpdateCount] = useState<number>(0);
    const [renderViewCanvas, setRenderViewCanvas] = useState<HTMLCanvasElement | null>(null);

    const [renderView, setRenderView] = useState<RenderView | null>(null);
    const [artboardRenderer, setArtboardRenderer] = useState<SpritesRenderer | null>(null);

    const artboardRotate = useRecoilValue(ArtboardRotationAtom);
    const artboardScale = useRecoilValue(ArtboardScaleAtom);
    const artboardLocation = useRecoilValue(ArtboardLocationAtom);
    const artboardResolution = useRecoilValue(ArtboardResolutionAtom);
    const artboardAnchor = useRecoilValue(ArtboardAnchorAtom);

    const renderViewSize = useRecoilValue(RenderViewScaleAtom);
    const sprites = useRecoilValue(SpriteTreeAtom);

    const renderArtboardRendererResult = () => {
        if (artboardRenderer === null) {
            return;
        }
        if (renderView === null) {
            return;
        }
        renderView.viewport(new Vec2(renderViewSize));
        renderView.render(artboardRenderer.getResult(), {
            anchor: new Vec2(artboardAnchor),
            location: new Vec2(artboardLocation),
            rotate: artboardRotate,
            scale: new Vec2(artboardScale),
        });
        console.log(artboardAnchor, artboardLocation, artboardRotate, artboardScale)
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
        renderViewSize,
        artboardRotate,
        artboardScale,
        artboardLocation,
        artboardResolution,
        artboardAnchor,

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

export default useArtboardRender;