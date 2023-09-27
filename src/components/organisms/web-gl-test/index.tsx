import { useEffect, useRef, useState } from 'react';
import { Vec2 } from 'application/core/units';
import { Texture2D } from 'application/core/web-gl2';
import { TextureRenderer } from 'application/core/web-gl2/renderer/TextureRenderer';

const GLtest = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) {
            throw new Error('object is null');
        }
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const sCanvas = document.createElement('canvas');
        const sCtx = sCanvas.getContext('2d') as CanvasRenderingContext2D;
        sCtx.fillStyle = '#eb4034';
        sCtx.fillRect(0, 0, sCtx.canvas.width / 2, sCtx.canvas.height / 2);

        const glCanvas = document.createElement('canvas');
        const gl2 = glCanvas.getContext('webgl2') as WebGL2RenderingContext;
        const fragmentShaderSource = /*glsl */ ` #version 300 es
        precision highp float;
        
        uniform sampler2D u_texture;
        in vec2 v_texCoord;
        out vec4 outColor;

        void main() {
          vec4 color=texture(u_texture, v_texCoord);
          outColor = vec4(color.rgb, 1.0);
        }
        `;
        (async () => {
            const image = await createImageBitmap(sCanvas);
            const tex = new Texture2D(gl2).attachImage(image, new Vec2(image.width, image.height));

            const renderer = new TextureRenderer(
                gl2,
                new Vec2(image.width, image.height),
                new Vec2(0, 0),
                { fragmentSource: fragmentShaderSource, fragmentUniforms: {} }
            );
            renderer.useTexRendering(({ render }) => {
                render(tex, { flipY: true });
            });
            ctx.drawImage(glCanvas, 0, 0);
        })();
    }, []);
    return (
        <>
            <canvas width="1280" height="720" ref={canvasRef}></canvas>
        </>
    );
};
export { GLtest };
