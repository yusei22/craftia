import { DefaultValue, selector } from "recoil";
import { ArtboardAnchorAtom } from "./ArtboardAnchorAtom";
import { ArtboardLocationAtom } from "../location/ArtboardLocationAtom";
import { ArtboardScaleAtom } from "../scale/ArtboardScaleAtom";
import { Vec2 } from "application/core/units";
import { rotatePointAroundCenter } from "application/utils";
import { ArtboardRotationAtom } from "../rotation/ArtboardRotationAtom";

const ArtboardTransFixedAnchorSelector = selector({
    key: 'artboardTransFixedAnchorSelector',
    get: ({ get }) => get(ArtboardAnchorAtom),
    set: ({ get, set }, newAnchor) => {
        if (newAnchor instanceof DefaultValue) return;

        const currentAnchor = new Vec2(get(ArtboardAnchorAtom));
        const currentLocation = new Vec2(get(ArtboardLocationAtom));
        const currentScale = new Vec2(get(ArtboardScaleAtom));

        const currentRotaion = get(ArtboardRotationAtom);

        const _newAnchor = new Vec2(newAnchor)

        const AnchorsRelativeDifference = new Vec2(
            (_newAnchor.x - currentAnchor.x) * currentScale.x,
            (_newAnchor.y - currentAnchor.y) * currentScale.y,
        )

        const newLocation = rotatePointAroundCenter(
            currentLocation,
            currentLocation.add(AnchorsRelativeDifference),
            currentRotaion
        )

        set(ArtboardAnchorAtom, _newAnchor.toArray());
        set(ArtboardLocationAtom, newLocation.toArray(),);
        set(ArtboardScaleAtom, currentScale.toArray());
        set(ArtboardRotationAtom, currentRotaion);
    }
})

export { ArtboardTransFixedAnchorSelector };