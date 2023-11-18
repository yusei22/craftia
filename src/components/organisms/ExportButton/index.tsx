import { useEffect, useState } from 'react';
import { Vec2 } from 'application/core/units';
import { SpritesRenderer } from 'application/render/SpritesRenderer';
import { Sprite } from 'application/sprites/Sprite';
import Button from 'components/atoms/Button';
import { artboardResolutionAtom, spriteTreeAtom } from 'dataflow';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';

export const ExportButton = () => {
    const [artboardRenderer, setArtboardRenderer] = useState<SpritesRenderer | null>(null);
    const getSpriteTreeSync = useRecoilValueSyncReader<Sprite<any>[]>();// eslint-disable-line
    const getArtobardResolutionSync = useRecoilValueSyncReader<Vec2>();
    const [url, setUrl] = useState('#');
    const [fileName, setFilename] = useState('project.png');

    const onClick = () => {
        if (artboardRenderer === null) {
            return;
        }
        const resolution = getArtobardResolutionSync(artboardResolutionAtom);
        const sprites = getSpriteTreeSync(spriteTreeAtom);
        artboardRenderer.viewport(resolution);
        artboardRenderer.render(sprites);
        setUrl((artboardRenderer.getResult() as HTMLCanvasElement).toDataURL());
        setFilename('project.png');
    };

    useEffect(() => {
        setArtboardRenderer(new SpritesRenderer());
    }, []);

    return (
        <a onClick={onClick} href={url} download={fileName}>
            <Button variant="translucent">書き出し</Button>
        </a>
    );
};
