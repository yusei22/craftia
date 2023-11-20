import { ChangeEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { Vec2 } from 'application/core/units';
import { ImageURLDecoder } from 'application/files/ImageURLDecoder';
import { Rasterizedmage } from 'application/sprites/RasterizedImage';
import Label from 'components/atoms/Label';
import Container from 'components/layout/Container';
import { TabSection } from 'components/molecules/TabSection';
import { spriteTreeAtom, useSpriteTreeSaver } from 'dataflow';

export const ImportTabPanel = () => {
    const setSpriteTree = useSetRecoilState(spriteTreeAtom);
    const saveSpriteTree = useSpriteTreeSaver();

    const fileInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        if (file === null) return;

        for (let i = 0; i < file.length; i++) {
            const reader = new FileReader();
            reader.readAsDataURL(file[i]);
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
    };
    return (
        <>
            <Container
                css={{
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    height: '100%',
                    overflowY: 'auto',
                    padding: '0px 10px',
                }}
            >
                <TabSection>
                    <Label size="sm">画像をインポート:</Label>
                    <input type="file" multiple onChange={fileInputOnChange}></input>
                </TabSection>
            </Container>
        </>
    );
};
