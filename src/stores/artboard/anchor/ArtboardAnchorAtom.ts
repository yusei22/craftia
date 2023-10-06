import { atom } from "recoil";
import { AtomKeys } from "stores/recoilKeys";

const ArtboardAnchorAtom = atom<[number, number]>({
    key: AtomKeys.ARTBOARD_ANCHOR_ATOM,
    default: [0,0]
})

export { ArtboardAnchorAtom };