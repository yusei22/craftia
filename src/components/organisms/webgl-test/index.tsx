import { useEffect, useRef, useState } from 'react';
import { Vec2 } from 'application/core/units';
import { DataURLDecoder } from 'application/files/data-url/DataURLDecoder';
import { ImageEditor, ImageEditorSource } from 'application/filter/ImageEditor';

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
            const image = await new DataURLDecoder().decode('/sample.png');
            const imageSize = new Vec2(image.width, image.height);
            const editorImage = new ImageEditorSource(image, imageSize);

            const editor = new ImageEditor(editorImage, unsharpMasking.default);
            editor.listener[0] = ({ setUniformFloat, setUniformInt }) => {
                setUniformFloat('u_threshold', 3.0);
                setUniformInt('u_radius', 10);
            };
            editor.executeMultiple(1);

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
