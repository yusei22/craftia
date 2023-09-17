import { Context2D } from 'application/core/context-2d';

type IShapeDrawProps = {
    context: Context2D;
};
interface IShape {
    readonly draw: (props: IShapeDrawProps) => void;
}

export type { IShape, IShapeDrawProps };
