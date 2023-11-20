import { useSetRecoilState } from 'recoil';
import { Sprite, SpriteTree } from 'application/sprites';
import Button from 'components/atoms/Button';
import Typography from 'components/atoms/Typography';
import { spriteTreeAtom, useSpriteTreeSaver } from 'dataflow';
import { activeSpriteIdsAtom } from 'dataflow/sprites/activeSpriteIdAtom';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';

export const LayerDeleteButton = () => {
    const getActiveSpriteIds = useRecoilValueSyncReader<string[]>();
    const getSpriteTree = useRecoilValueSyncReader<SpriteTree>();

    const saveSpriteTree = useSpriteTreeSaver();
    const setRecoilState = useSetRecoilState(spriteTreeAtom);

    const onClick = () => {
        const activeIds = getActiveSpriteIds(activeSpriteIdsAtom);
        const currentSprites = getSpriteTree(spriteTreeAtom);

        const newSprites: Sprite[] = [];

        currentSprites.forEach((sprite) => {
            if (!activeIds.includes(sprite.prefs.id)) {
                newSprites.push(sprite);
            }
        });

        setRecoilState(newSprites);
        saveSpriteTree();
    };
    return (
        <Button onClick={onClick} variant="translucent">
            <Typography variant="small">レイヤーを削除</Typography>
        </Button>
    );
};
