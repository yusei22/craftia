import { useSetRecoilState } from 'recoil';
import { Vec2 } from 'application/core/units';
import Wrapper from 'components/layout/Wrapper';
import { renderViewListenersAtom, useSpriteTreeSaver } from 'dataflow';
import { activeSpriteIdsAtom } from 'dataflow/sprites/activeSpriteIdAtom';
import { toolMenuAtom } from 'dataflow/toolMenues/toolMenuAtom';
import { useRenderViewMouseGesture } from 'hooks/renderViews/useRenderViewMouseGesture';
import { useRenderViewTouchGesture } from 'hooks/renderViews/useRenderViewTouchGesture';
import { useRenderViewWheelGesture } from 'hooks/renderViews/useRenderViewWheelGesture';
import { useSpriteMover } from 'hooks/sprites/useSpriteMover';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';

export const SpriteMoveTool = ({ children }: { children?: React.ReactNode }) => {
    const { onWheel } = useRenderViewWheelGesture();
    const { onPinch } = useRenderViewTouchGesture();
    const { onMove } = useRenderViewMouseGesture();

    const setRenderViewListeners = useSetRecoilState(renderViewListenersAtom);
    const getActiveSpriteIds = useRecoilValueSyncReader<string[]>();
    const moveSprite = useSpriteMover();
    const saveSpriteTree = useSpriteTreeSaver();
    const setToolMenu = useSetRecoilState(toolMenuAtom);

    const onClick = () => {
        setRenderViewListeners({
            onPinch,
            onWheel,
            onDrag: ({ delta, event, touches, last }) => {
                event.preventDefault();

                if (touches > 1) {
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
