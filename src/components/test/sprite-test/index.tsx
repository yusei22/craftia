import { Vec2, Vec4 } from "application/core/units"
import { DataURLDecoder } from "application/files/data-url/DataURLDecoder"
import { SpriteRenderer } from "application/render/SpriteRenderer"
import { Rasterizedmage } from "application/sprites/RasterizedImage"
import { SmartImage } from "application/sprites/SmartImage"
import { FillSolid } from "application/sprites/SpriteFill"
import { Rect } from "application/sprites/shapes/Rect"
import { useEffect, useRef } from "react"

const SpriteTest = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (!canvasRef.current) {
            throw new Error('object is null');
        }
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        (async () => {
            const imageSource = await new DataURLDecoder().decode('/m.png');
            const imageSource2 = await new DataURLDecoder().decode('/sample.png');
            const rect = new Rect({
                id: crypto.randomUUID(),
                name: 'rect',
                anchor: new Vec2(0,0),
                globalLocation: new Vec2(200, 300),
                rotation: 0 / 180 * Math.PI,
                visible: true,
                blendMode: 'source-over',
                opacity: 1.0,
                shadowBlur: 0,
                shadowColor: '#0000',
                shadowOffset: new Vec2(0, 0),
                fillStyle: new FillSolid({ color: new Vec4(255, 0, 0, 0.8) }),
                strokeCap: 'round',
                strokeDashOffset: 0,
                strokeJoin: 'bevel',
                strokeWidth: 10,
                strokeStyle: new FillSolid({ color: new Vec4(0, 0, 0, 1) }),
                scale: new Vec2(300, 300),
                round: 20,
            })
            const image = new SmartImage(imageSource, {
                id: crypto.randomUUID(),
                name: 'image',
                anchor: new Vec2(0, 0),
                globalLocation: new Vec2(0, 0),
                rotation: 45 / 180 * Math.PI,
                visible: true,
                blendMode: 'source-over',
                opacity: 1.0,
                shadowBlur: 0,
                shadowColor: '#0000',
                shadowOffset: new Vec2(0, 0),
                scale: new Vec2(500, 500)
            })
            const image2 = new Rasterizedmage(imageSource2, {
                id: crypto.randomUUID(),
                name: 'image',
                anchor: new Vec2(0, 0),
                globalLocation: new Vec2(200, 0),
                rotation: 0 / 180 * Math.PI,
                visible: true,
                blendMode: 'lighten',
                opacity: 1.0,
                shadowBlur: 0,
                shadowColor: '#0000',
                shadowOffset: new Vec2(0, 0),
            })
            const renderer = new SpriteRenderer();
            renderer.viewport(new Vec2(1000, 1000))

            renderer.render([image, rect,image2]);
            ctx.drawImage(renderer.getResult(), 0, 0)
        })();

    }, [])
    return (
        <>
            <canvas width="2000" height="1000" ref={canvasRef}></canvas>
        </>
    );
}
export { SpriteTest }