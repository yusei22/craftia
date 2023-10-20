import { ChangeEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { Vec2 } from 'application/core/units';
import { DataURLDecoder } from 'application/files/data-url/DataURLDecoder';
import { Rasterizedmage } from 'application/sprites/RasterizedImage';
import Container from 'components/layout/Container';
import { TabSection } from 'components/molecules/TabSection';
import { spriteTreeAtom } from 'dataflow';

export const ImportTabPanel = () => {
    const setSpriteTree = useSetRecoilState(spriteTreeAtom);

    const fileInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        if (file === null) return;

        const reader = new FileReader();
        reader.readAsDataURL(file[0]);

        reader.onload = async () => {
            const dataUrl = reader.result;

            if (dataUrl === null) return;
            if (dataUrl instanceof ArrayBuffer) return;

            const imageSource = await new DataURLDecoder().decode(dataUrl);

            const image = new Rasterizedmage(imageSource, {
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
            });
            setSpriteTree((curVal) => [...curVal, image]);
        };
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
                    <input type="file" onChange={fileInputOnChange}></input>
                </TabSection>
            </Container>
        </>
    );
};
