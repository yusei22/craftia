import { useSetRecoilState } from 'recoil';
import { Vec2 } from 'application/core/units';
import Wrapper from 'components/layout/Wrapper';
import { renderViewListenersAtom, useSpriteTreeSaver } from 'dataflow';
import { useMoveSprite } from 'hooks/renderViews/useMoveSprite';
import { useRenderViewMouseGesture } from 'hooks/renderViews/useRenderViewMouseGesture';
import { useRenderViewTouchGesture } from 'hooks/renderViews/useRenderViewTouchGesture';
import { useRenderViewWheelGesture } from 'hooks/renderViews/useRenderViewWheelGesture';
import { useGetActiveSprites } from 'hooks/sprites/useGetActiveSprites';

const SpriteMoveModeButtonWrapper = ({ children }: { children?: React.ReactNode }) => {
    const { onWheel } = useRenderViewWheelGesture();
    const { onPinch } = useRenderViewTouchGesture();
    const { onMove } = useRenderViewMouseGesture();
    const setRenderViewListeners = useSetRecoilState(renderViewListenersAtom);
    const getActiveSprites = useGetActiveSprites();
    const moveSprite = useMoveSprite();
    const saveSpriteTree = useSpriteTreeSaver();

    const onClick = () => {
        setRenderViewListeners({
            onPinch,
            onWheel,
            onDrag: ({ delta, event, touches, last }) => {
                event.preventDefault();
                if (touches > 1) {
                    return;
                }
                const activeSprite = getActiveSprites()[0];
                if (activeSprite) {
                    moveSprite(activeSprite, new Vec2(delta));
                    if (last) {
                        saveSpriteTree();
                    }
                }
            },
            onMove,
            onClick: () => {},
        });
    };

    return <Wrapper onClick={onClick}> {children} </Wrapper>;
};
export { SpriteMoveModeButtonWrapper };
