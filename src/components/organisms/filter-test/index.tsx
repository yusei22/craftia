import { useEffect, useRef, useState } from 'react';
import { Mat, Vec2 } from 'application/core/units';
import { DataURLDecoder } from 'application/files/data-url/DataURLDecoder';
import { Convolution } from 'application/filter/Convolution';
import { ImageEditor, ImageEditorSource } from 'application/filter/ImageEditor';
const FliterTest = () => {
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

            const conv = new Convolution(
                editorImage,
                new Mat<3, 3>(
                    [0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111],
                    [3, 3]
                )
            );
            conv.execute(10);
            ctx.drawImage(conv.getResult(), 0, 0);
        })();
    }, []);
    return (
        <>
            <canvas width="2000" height="1000" ref={canvasRef}></canvas>
        </>
    );
};
export { FliterTest };
