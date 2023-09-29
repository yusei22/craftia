import { Vec2 } from "application/core/units";
import { FilterSource, FilterWorker } from "../Filter";
import { ImageEditor, ImageEditorSource } from "../ImageEditor";
import { JSX } from "react";

const unsharpMasking = require('./unsharpMasking.frag');
const MAX_RADIUS = 20;

type UnsharpMaskingConfig = {
    radius: number;
    threshold: number;
}

class UnsharpMaskingWorker extends FilterWorker {
    private editor: ImageEditor;
    private config: UnsharpMaskingConfig;

    constructor(image: FilterSource, config: UnsharpMaskingConfig) {
        super();
        this.config = config;
        const source = new ImageEditorSource(
            image,
            new Vec2(image.width, image.height)
        );
        this.editor = new ImageEditor(source, unsharpMasking.default);
    }
    public execute(): void {
        const executionTimes = Math.ceil(this.config.radius / MAX_RADIUS);
        const finalRadius = this.config.radius % MAX_RADIUS;

        this.editor.listener[0] = ({ setUniformFloat, setUniformInt }) => {
            setUniformFloat('u_threshold', this.config.threshold);
            setUniformInt('u_radius', MAX_RADIUS);
        }
        this.editor.listener[executionTimes - 1] = ({ setUniformInt }) => {
            setUniformInt('u_radius', finalRadius);
        }
    }
    public getParamChangeInput(): JSX.Element {
        return (<></>)
    }
}