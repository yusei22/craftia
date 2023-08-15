import { Texture2D } from "../webgl/Texture2D";
import { TexRendererSader } from "./TextureRenderer";
import { TextureEditor } from "./TextureEditor";
import { OffScreenRenderer } from "../OffScreenRenderer";
import { Vec2 } from "../../units";
class MultiTexturetEditor extends TextureEditor {
    private offScreenRenderers: OffScreenRenderer[] = [];
    protected onscreenRendering: boolean = false;
    private texture: Texture2D;
    public processTimes: number = 1;
    public listeners: Function[] = new Array();
    constructor(gl: WebGL2RenderingContext, texture: Texture2D, fragmentShader: TexRendererSader, location?: Vec2) {
        super(gl, texture.size, fragmentShader, location);
        this.texture = texture;
        this.offScreenRenderers[0] = new OffScreenRenderer(this.gl, this.texture.size);
        this.offScreenRenderers[1] = new OffScreenRenderer(this.gl, this.texture.size);
    }
    execute({ flipY = false, readPixcels = false }: { flipY?: boolean, readPixcels?: boolean } = {}) {
        let nextTexture: Texture2D = this.texture;
        let count = 0;
        for (let i = 0; i < this.processTimes - 1; i++) {
            this.offScreenRenderers[i % 2].activate();
            this.listeners[i]?.();
            this.processTexture(nextTexture, { flipY: false, createPixcelsData: false });
            nextTexture = this.offScreenRenderers[i % 2].resultTexture;
            count++
        }
        if (this.onscreenRendering) {
            OffScreenRenderer.toOnscreen(this.gl);
        }
        else {
            this.offScreenRenderers[count % 2].activate();
        }
        this.listeners[count]?.();
        const pixcelData: Uint8Array | undefined =
            this.processTexture(nextTexture, { flipY: flipY, createPixcelsData: readPixcels });
        return pixcelData;
    }
}
class MultiOffScreenTexEditor extends MultiTexturetEditor {
    constructor(gl: WebGL2RenderingContext, texture: Texture2D, fragmentShader: TexRendererSader, location?: Vec2) {
        super(gl, texture, fragmentShader, location);
        this.onscreenRendering = false;
    }
}
class MultiOnScreenTexEditor extends MultiTexturetEditor {
    constructor(gl: WebGL2RenderingContext, texture: Texture2D, fragmentShader: TexRendererSader, location?: Vec2) {
        super(gl, texture, fragmentShader, location);
        this.onscreenRendering = true;
    }
}
export { MultiOffScreenTexEditor, MultiOnScreenTexEditor }