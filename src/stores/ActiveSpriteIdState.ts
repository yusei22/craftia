import { atom } from 'recoil';

const ActiveSpriteIdState = atom<string>({
    key: 'activeSpriteIdState',
    default: '',
});

export { ActiveSpriteIdState };
