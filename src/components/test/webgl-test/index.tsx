import { useEffect, useRef, useState } from 'react';
import { Vec2 } from 'application/core/units';
import { DataURLDecoder } from 'application/files/data-url/DataURLDecoder';
import { ImageEditor } from 'application/filters/ImageEditor';

const unsharpMasking = require('./unsharpMasking.frag');

const GLtest = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) {
            throw new Error('object is null');
        }
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        (async () => {
            const image = await new DataURLDecoder().decode('/m.png');
            const imageSize = new Vec2(image.width, image.height);

            const editor = new ImageEditor(imageSize, unsharpMasking.default);
            editor.setImage(image, imageSize);
            editor.listener[0] = ({ setUniformFloat, setUniformInt }) => {
                setUniformFloat('u_threshold', 2.0);
                setUniformInt('u_radius', 3);
            };
            editor.execute(1);

            ctx.drawImage(editor.getResult(), 0, 0);
        })();
    }, []);
    return (
        <>
            <canvas width="2000" height="1000" ref={canvasRef}></canvas>
        </>
    );
};
export { GLtest };
