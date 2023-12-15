import { useSetRecoilState } from 'recoil';
import { Vec2 } from 'application/core/units';
import Wrapper from 'components/layout/Wrapper';
import { renderViewListenersAtom, useSpriteTreeSaver } from 'dataflow';
import { activeSpriteIdsAtom } from 'dataflow/sprites/activeSpriteIdAtom';
import { toolMenuAtom } from 'dataflow/toolMenues/toolMenuAtom';
import { useRenderViewMouseGesture } from 'hooks/renderViews/useRenderViewMouseGesture';
import { useRenderViewTouchGesture } from 'hooks/renderViews/useRenderViewTouchGesture';
import { useRenderViewWheelGesture } from 'hooks/renderViews/useRenderViewWheelGesture';
import { useSpriteHitDetection } from 'hooks/sprites/useSpriteHitDetection';
import { useSpriteMover } from 'hooks/sprites/useSpriteMover';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';

export const SpriteSelectTool = ({ children }: { children?: React.ReactNode }) => {
    const { onWheel } = useRenderViewWheelGesture();
    const { onPinch } = useRenderViewTouchGesture();
    const { onMove } = useRenderViewMouseGesture();

    const moveSprite = useSpriteMover();
    const setActiveSpriteIds = useSetRecoilState(activeSpriteIdsAtom);
    const detectHitSprite = useSpriteHitDetection();
    const setRenderViewListeners = useSetRecoilState(renderViewListenersAtom);
    const saveSpriteTree = useSpriteTreeSaver();
    const getActiveSpriteIds = useRecoilValueSyncReader<string[]>();

    const setToolMenu = useSetRecoilState(toolMenuAtom);

    const onClick = () => {
        setRenderViewListeners({
            onPinch,
            onWheel,
            onDrag: ({ delta, first, xy, touches, last }) => {
                if (touches > 1) {
                    return;
                }
                if (first) {
                    const hitSprite = detectHitSprite(new Vec2(xy));
                    setActiveSpriteIds(hitSprite?.prefs.id ? [hitSprite?.prefs.id] : []);
                    return;
                }

                const activeSpriteIds = getActiveSpriteIds(activeSpriteIdsAtom);
                moveSprite(activeSpriteIds, new Vec2(delta));

                if (last) {
                    saveSpriteTree();
                }
            },
            onMove,
            onClick: () => {},
        });
        setToolMenu(() => <></>);
    };

    return <Wrapper onClick={onClick}> {children} </Wrapper>;
};
