import { useSetRecoilState } from 'recoil';
import { Sprite, SpriteTree } from 'application/sprites';
import Wrapper from 'components/layout/Wrapper';
import { spriteTreeAtom, useSpriteTreeSaver } from 'dataflow';
import { activeSpriteIdsAtom } from 'dataflow/sprites/activeSpriteIdAtom';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';

export type LayerDeleteButtonProps = {
    children?: React.ReactNode;
    className?: string;
};

export const LayerDeleteButton = ({ children, className }: LayerDeleteButtonProps) => {
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
        <Wrapper onClick={onClick} className={className}>
            {children}
        </Wrapper>
    );
};
