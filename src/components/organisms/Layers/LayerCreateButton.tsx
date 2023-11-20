import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { Context2D } from 'application/core/context-2d';
import { Vec2 } from 'application/core/units';
import { RasterizedImagePrefs, Rasterizedmage } from 'application/sprites';
import Button from 'components/atoms/Button';
import Typography from 'components/atoms/Typography';
import { spriteTreeAtom, useSpriteTreeSaver } from 'dataflow';

export const LayerCreateButton = () => {
    const setSpriteTree = useSetRecoilState(spriteTreeAtom);
    const saveSpriteTree = useSpriteTreeSaver();

    const onClick = () => {
        const initalPrefs: RasterizedImagePrefs = {
            id: uuidv4(),
            name: '新規レイヤー',
            anchor: new Vec2(0, 0),
            globalLocation: new Vec2(0, 0),
            rotation: (0 / 180) * Math.PI,
            visible: true,
            blendMode: 'source-over',
            opacity: 1.0,
            shadowBlur: 0,
            shadowColor: '#0000',
            shadowOffset: new Vec2(0, 0),
        };
        (async () => {
            const image = await createImageBitmap(
                new Context2D().viewport(new Vec2(1, 1)).getCanvas()
            );
            setSpriteTree((curVal) => [...curVal, new Rasterizedmage(image, initalPrefs, null)]);
            saveSpriteTree();
        })();
    };
    return (
        <>
            <Button onClick={onClick} variant="translucent">
                <Typography variant="small">新規レイヤーを追加</Typography>
            </Button>
        </>
    );
};
