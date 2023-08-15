import { Vec2 } from "../units";
abstract class Ctx2DConsumer {
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }
    private context: CanvasRenderingContext2D;
    private get drawable() {
        if (this.context.canvas.width <= 0 || this.context.canvas.height <= 0) return false;
        return true;
    }
    /**内包するキャンバス */
    protected getCanvas() {
        return this.context.canvas;
    }
    /**
     * コンテキストのパラメーターを変更する関数  ⚠ 描画時に使ってはいけない ⚠
     * @param func コンテキストに描画できる・できないにかかわらず呼ばれる関数 第一引数にはコンテキストが渡される
     */
    protected useContext2DToChangeParam(func: (context: CanvasRenderingContext2D) => any) {
        func(this.context);
    }
    /**
     * コンテキストで描画を行うための関数
     * @param funcWhenDrawable コンテキストに描画できる時に呼ばれる関数   第一引数にはコンテキストが渡される
     * @param funcWhenNotDrawable コンテキストに描画できない時に呼ばれる関数   第一引数にはコンテキストが渡される
     */
    protected useContext2D(
        funcWhenDrawable: (context: CanvasRenderingContext2D) => any,
        funcWhenNotDrawable: (context: CanvasRenderingContext2D) => any = () => { }
    ) {
        if (this.drawable) {
            funcWhenDrawable(this.context);
        }
        else {
            funcWhenNotDrawable(this.context);
        }
    }
    /**
     * canvasをリサイズ
     * @param size 大きさ
     */
    protected viewport(size: Vec2) {
        this.context.canvas.width = size.x;
        this.context.canvas.height = size.y;
    }
    /**
     * canvasをクリア
     */
    protected clear() {
        this.useContext2D((ctx: CanvasRenderingContext2D) => {
            ctx.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        });
    }
    /**
     * canvasサイズ0に
     */
    protected destroy() {
        this.viewport(new Vec2(0, 0));
    }
    /**
     * 画像描画
     * @param souce 画像ソース
     * @param location 描画位置
     */
    protected drawImage(souce: CanvasImageSource, location: Vec2): void;
    protected drawImage(souce: CanvasImageSource, location: Vec2, resize: Vec2): void;
    protected drawImage(souce: CanvasImageSource, croppingLocation: Vec2, croppingSize: Vec2, location: Vec2, resize: Vec2): void;
    protected drawImage(souce: CanvasImageSource, a: Vec2, b?: Vec2, c?: Vec2, d?: Vec2): void {
        if (souce instanceof VideoFrame) {
            if (souce.codedWidth <= 0 || souce.codedHeight <= 0) return;
        }
        else if (!(souce instanceof SVGImageElement)) {
            if (souce.width <= 0 || souce.height <= 0) return;
        }
        this.useContext2D((ctx: CanvasRenderingContext2D) => {
            if (b && c && d) {
                ctx.drawImage(souce, a.x, a.y, b.x, b.y, c.x, c.y, d.x, d.y);
            }
            else if (b) {
                ctx.drawImage(souce, a.x, a.y, b.x, b.y);
            }
            else {
                ctx.drawImage(souce, a.x, a.y);
            }
        })
    }
    protected getImageData(location: Vec2, size: Vec2) {
        let imageData: ImageData = new ImageData(1, 1)
        this.useContext2D((ctx: CanvasRenderingContext2D) => {
            imageData = ctx.getImageData(location.x, location.y, size.x, size.y)
        })
        return imageData;

    }
    protected putImageData(imageData: ImageData, location: Vec2): void
    protected putImageData(imageData: ImageData, location: Vec2, croppingLocation: Vec2, croppingSize: Vec2): void
    protected putImageData(imageData: ImageData, location: Vec2, croppingLocation?: Vec2, croppingSize?: Vec2): void {
        this.useContext2D((ctx: CanvasRenderingContext2D) => {
            if (croppingLocation && croppingSize) {
                ctx.putImageData(
                    imageData,
                    location.x,
                    location.y,
                    croppingLocation.x,
                    croppingLocation.y,
                    croppingSize.x,
                    croppingSize.y
                )
            }
            else {
                ctx.putImageData(imageData, location.x, location.y)
            }

        })
    }
}
export { Ctx2DConsumer };