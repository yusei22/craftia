import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { Vec2 } from 'application/core/units';
import { ImageURLDecoder } from 'application/files/ImageURLDecoder';
import { Rasterizedmage } from 'application/sprites/RasterizedImage';
import { FileInput } from 'components/molecules/FileInput';
import { spriteTreeAtom, useSpriteTreeSaver } from 'dataflow';

export type ImageImportButtonProps = {
    className?: string;
    children?: React.ReactNode;
};

export const ImageImportButton = ({ children, className }: ImageImportButtonProps) => {
    const setSpriteTree = useSetRecoilState(spriteTreeAtom);
    const saveSpriteTree = useSpriteTreeSaver();

    const [fileList, setFileList] = useState<FileList | null>(null);

    useEffect(() => {
        if (!fileList) {
            return;
        }

        for (let i = 0; i < fileList.length; i++) {
            const reader = new FileReader();

            reader.readAsDataURL(fileList[i]);

            reader.onload = async () => {
                const dataUrl = reader.result;

                if (dataUrl === null) return;
                if (dataUrl instanceof ArrayBuffer) return;

                const imageSource = await new ImageURLDecoder().decode(dataUrl);

                const image = new Rasterizedmage(
                    imageSource,
                    {
                        id: uuidv4(),
                        name: '新規レイヤー',
                        anchor: new Vec2(0, 0),
                        globalLocation: new Vec2(0, 0),
                        rotation: (0 / 180) * Math.PI,
                        visible: true,
                        blendMode: 'source-over',
                        opacity: 1.0,
                        shadowBlur: 0,
                        shadowColor: '#0000',
                        shadowOffset: new Vec2(0, 0),
                    },
                    null
                );

                setSpriteTree((curVal) => [...curVal, image]);
                saveSpriteTree();
            };
        }
    }, [fileList]);
    return (
        <FileInput
            setFileList={setFileList}
            accept="image/png, image/jpeg, image/webp"
            css={{
                width: '100%',
            }}
            className={className}
            multiple
        >
            {children}
        </FileInput>
    );
};
