import { atom } from "recoil";

const ArtboardBaseZoomScaleState = atom<[number, number]>({
    key: 'artboardBaseZoomScaleState',
    default: [1, 1]
})

export { ArtboardBaseZoomScaleState };