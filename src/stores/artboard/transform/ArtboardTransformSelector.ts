import { DefaultValue, selector } from "recoil";
import { ArtboardAnchorAtom } from "../anchor/ArtboardAnchorAtom";
import { ArtboardLocationAtom } from "../location/ArtboardLocationAtom";
import { ArtboardRotationAtom } from "../rotation/ArtboardRotationAtom";
import { ArtboardScaleAtom } from "../scale/ArtboardScaleAtom";

type ArtboardTranslate = {
    anchor: [number, number],
    location: [number, number],
    scale: [number, number],
    rotation: number
}

const ArtboardTransformSelector = selector<ArtboardTranslate>({
    key: '',
    get({ get }) {
        return {
            anchor: get(ArtboardAnchorAtom),
            location: get(ArtboardLocationAtom),
            scale: get(ArtboardLocationAtom),
            rotation: get(ArtboardRotationAtom)
        }
    }
})

export { ArtboardTransformSelector };