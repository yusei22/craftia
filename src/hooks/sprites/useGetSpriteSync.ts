import { RecoilValue, useRecoilCallback } from 'recoil';
import { Sprite } from 'application/sprites/Sprite';
import { spriteTreeAtom } from 'dataflow';

const useGetSpriteSync = () => {
    const getSpriteTreeStateSync = useRecoilCallback<[state: RecoilValue<Sprite[]>], Sprite[]>(
        ({ snapshot }) =>
            (state) => {
                return snapshot.getLoadable(state).contents;
            },
        []
    );
    const getSpriteSync = () => {
        return getSpriteTreeStateSync(spriteTreeAtom);
    }
    return getSpriteSync;
}
export { useGetSpriteSync };