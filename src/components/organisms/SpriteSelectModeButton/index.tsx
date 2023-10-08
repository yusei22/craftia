import { IconButton } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import { Vec2 } from 'application/core/units';
import Wrapper from 'components/layout/Wrapper';
import { renderViewListenersAtom, spriteTreeAtom } from 'dataflow';
import { useRenderViewMouseGesture } from 'hooks/renderViews/useRenderViewMouseGesture';
import { useRenderViewTouchGesture } from 'hooks/renderViews/useRenderViewTouchGesture';
import { useRenderViewWheelGesture } from 'hooks/renderViews/useRenderViewWheelGesture';
import { useSpriteHitDetection } from 'hooks/renderViews/useSpriteHitDetection';

const SpriteSelectModeButton = ({ children }: { children?: React.ReactNode }) => {
    const { onWheel } = useRenderViewWheelGesture();
    const { onPinch } = useRenderViewTouchGesture();
    const { onMove } = useRenderViewMouseGesture();

    const detectHitSprite = useSpriteHitDetection();

    const setRenderViewListeners = useSetRecoilState(renderViewListenersAtom);
    const setSpriteTree = useSetRecoilState(spriteTreeAtom);

    const onClick = () => {
        setRenderViewListeners({
            onPinch,
            onWheel,
            onDrag: ({ delta }) => {
                setSpriteTree((sprites) => {
                    const [spriteFront, spriteMiddle, ...spriteBAck] = sprites;

                    const newSprite = spriteMiddle.clone();
                    newSprite.prefs.globalLocation = newSprite.prefs.globalLocation.add(
                        new Vec2(delta)
                    );
                    return [spriteFront, newSprite, ...spriteBAck];
                });
            },
            onMove,
            onClick: () => {},
        });
    };

    return <Wrapper onClick={onClick}> {children} </Wrapper>;
};

export { SpriteSelectModeButton };
