import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { Vec2 } from 'application/core/units';
import { ImageURLDecoder } from 'application/files/ImageURLDecoder';
import { Rasterizedmage } from 'application/sprites';
import { FileInput } from 'components/molecules/FileInput';
import {
    stageResolutionAtom,
    spriteTreeAtom,
    useSpriteTreeSaver,
    stageTransformAtom,
} from 'dataflow';

export const OpenButton = ({
    children,
    className,
}: {
    children?: React.ReactNode;
    className?: string;
}) => {
    const [fileList, setFileList] = useState<FileList | null>(null);

    const setStageResolution = useSetRecoilState(stageResolutionAtom);
    const saveSpriteTree = useSpriteTreeSaver();
    const setSpriteTree = useSetRecoilState(spriteTreeAtom);
    const setStageTrans = useSetRecoilState(stageTransformAtom);

    useEffect(() => {
        if (fileList && fileList[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(fileList[0]);

            reader.onload = async () => {
                const dataUrl = reader.result;

                if (dataUrl === null) return;
                if (dataUrl instanceof ArrayBuffer) return;

                const imageSource = await new ImageURLDecoder().decode(dataUrl);

                const resolution = new Vec2(imageSource.width, imageSource.height);
                setStageResolution(resolution);
                setStageTrans((curVal) => ({
                    ...curVal,
                    scale: resolution,
                }));
                setSpriteTree([
                    new Rasterizedmage(
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
                    ),
                ]);
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
        >
            {children}
        </FileInput>
    );
};
